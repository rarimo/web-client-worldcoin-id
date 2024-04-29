import { config, RELAYER_RELAY_CHAIN_NAMES } from '@config'
import { ethers, providers } from 'ethers'
import { describe, expect, it } from 'vitest'

import {
  identityManager,
  isStateReplicated,
} from '@/contexts/ZkpContext/helpers'
import { WorldIDIdentityManagerImplV2__factory } from '@/types'

const TIMEOUT = 60_000

describe('Flow', () => {
  // const root =
  //   '0x0357aeaa0c164112ea898f9e0dee7d2371097bbe6ff4808620e1ebda4c40336e'

  let root = ''

  it(
    'Should fetch recent root from source contract',
    async () => {
      const provider = new providers.JsonRpcProvider(
        // 'https://endpoints.omniatech.io/v1/eth/sepolia/public',
        'https://sepolia.infura.io/v3/f7b64eab166144588efb89c5cb7ef27a',
        'any',
      )

      const worldIdIdentityManager =
        WorldIDIdentityManagerImplV2__factory.connect(
          '0xe13BFc31f32099F86B24eEbdF00e694F303689ab',
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
      const isMerkleRootValid = await isStateReplicated(
        root,
        config.RARIMO_CORE_API_URL,
        RELAYER_RELAY_CHAIN_NAMES[config.DEFAULT_CHAIN],
      )

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
