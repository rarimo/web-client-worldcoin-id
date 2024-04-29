import { config } from '@config'
import { fetcher } from '@distributedlab/fetcher'
import { RawProvider } from '@distributedlab/w3p'
import { providers } from 'ethers'
import get from 'lodash/get'

import { createIdentityManager, sleep } from '@/helpers'

export const destinationChainProvider = new providers.JsonRpcProvider(
  config.SUPPORTED_CHAINS_DETAILS[config.DEFAULT_CHAIN].rpcUrl,
  'any',
)

export const identityManager = createIdentityManager(
  config?.[
    `IDENTITY_MANAGER_CONTRACT_ADDRESS_${config.DEFAULT_CHAIN}`
  ] as string,
  destinationChainProvider as unknown as RawProvider,
)

export enum RelayerRelayErrorCodes {
  AlreadyTransited = '3',
  EntryNotFound = '5',
}

export const isStateReplicated = async (
  merkle_root: string,
  apiUrl: string,
  relayerChain: string,
  timeout = 60_000,
) => {
  let isMerkleRootValid = false

  let triesCount = 0

  do {
    try {
      const { data } = await fetcher.post<{
        tx: string
      }>(`${apiUrl}/integrations/relayer-wc/state/relay`, {
        body: {
          hash: merkle_root,
          chain: relayerChain,
        },
      })

      if (!data?.tx) throw new Error('tx is not defined')

      const txReceipt = await destinationChainProvider?.getTransaction(data.tx)

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
      }
    }

    if (!isMerkleRootValid) {
      await sleep(5_000)
      triesCount++
    }
  } while (!isMerkleRootValid && triesCount < (timeout * 5) / 5_000)

  return isMerkleRootValid
}
