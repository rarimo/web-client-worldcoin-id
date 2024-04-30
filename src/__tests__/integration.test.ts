import { config, RELAYER_RELAY_CHAIN_NAMES } from '@config'
import { fetcher } from '@distributedlab/fetcher'
import { ethers, providers } from 'ethers'
import get from 'lodash/get'
import { describe, expect, it } from 'vitest'

import {
  destinationChainProvider,
  identityManager,
  RelayerRelayErrorCodes,
} from '@/contexts/ZkpContext/helpers'
import { sleep } from '@/helpers'
import { WorldIDIdentityManagerImplV2__factory } from '@/types'

const TIMEOUT = 60_000
const WORLD_ID_IDENTITY_MANAGER_IMPL_V_2_ADDRESS =
  '0xe13BFc31f32099F86B24eEbdF00e694F303689ab'

describe('WorldID state replication', () => {
  let root = ''

  it(
    'Should fetch recent root from source contract',
    async () => {
      const provider = new providers.JsonRpcProvider(
        'https://ethereum-sepolia-rpc.publicnode.com',
        'any',
      )

      const worldIdIdentityManager =
        WorldIDIdentityManagerImplV2__factory.connect(
          WORLD_ID_IDENTITY_MANAGER_IMPL_V_2_ADDRESS,
          provider,
        )

      const latestRoot = await worldIdIdentityManager.latestRoot()

      root = latestRoot.toString()

      expect(root).not.toBe('')
    },
    TIMEOUT,
  )
  it(
    'Should call relayer to replicate root to destination chain',
    async () => {
      const apiUrl = config.RARIMO_CORE_API_URL
      const relayerChain = RELAYER_RELAY_CHAIN_NAMES[config.DEFAULT_CHAIN]
      const timeout = 60_000

      let isMerkleRootValid = false

      let triesCount = 0

      do {
        try {
          const { data } = await fetcher.post<{
            tx: string
          }>(`${apiUrl}/integrations/relayer-wc/state/relay`, {
            body: {
              hash: ethers.BigNumber.from(root).toHexString(),
              chain: relayerChain,
            },
          })

          if (!data?.tx) throw new Error('tx is not defined')

          const txReceipt = await destinationChainProvider?.getTransaction(
            data.tx,
          )

          await txReceipt?.wait?.()

          isMerkleRootValid = true
        } catch (error) {
          // TODO: if error === 400(3) how should we wait transit tx?
          switch (String(get(error, 'response.data.code'))) {
            case RelayerRelayErrorCodes.AlreadyTransited:
              isMerkleRootValid = true
              break
            case RelayerRelayErrorCodes.EntryNotFound:
              isMerkleRootValid = false
              break
            default:
              isMerkleRootValid = false
              throw error
          }
        }

        if (!isMerkleRootValid) {
          await sleep(5_000)
          triesCount++
        }
      } while (!isMerkleRootValid && triesCount < (timeout * 5) / 5_000)

      expect(isMerkleRootValid).toBe(true)
    },
    TIMEOUT,
  )
  it(
    'Replicated root in destination chain should be valid',
    async () => {
      const { isValid } = await identityManager.contractInstance.getRootInfo(
        ethers.BigNumber.from(root),
      )

      expect(isValid).toBe(true)
    },
    TIMEOUT,
  )
})
