import { fetcher } from '@distributedlab/fetcher'
import { ethers, providers } from 'ethers'
import get from 'lodash/get'
import { expect, test } from 'vitest'

import { IdentityManager__factory } from '@/types'

import FALLBACK_SUPPORTED_CHAINS from '../src/assets/fallback-supported-chains.json'

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

type SUPPORTED_CHAINS = keyof typeof FALLBACK_SUPPORTED_CHAINS

const RELAYER_RELAY_CHAIN_NAMES: Record<SUPPORTED_CHAINS, string> = {
  SEPOLIA: 'Sepolia',
  POLYGON: 'Polygon',
  POLYGON_TESTNET: 'Mumbai',
  MAINNET: 'Ethereum',
  ARBITRUM: 'Arbitrum',
  XDC: 'Xdc',
  AVALANCHE: 'Avalanche',
  FUJI: 'Fuji',
}

const DEFAULT_CHAIN = import.meta.env.VITE_DEFAULT_CHAIN

const identityManagerContractAddress = import.meta.env
  .VITE_IDENTITY_MANAGER_CONTRACT_ADDRESS_FUJI
const rpcUrl = get(FALLBACK_SUPPORTED_CHAINS, DEFAULT_CHAIN)?.rpcUrl as string

const provider = new providers.JsonRpcProvider(rpcUrl)

const contractInstance = IdentityManager__factory.connect(
  identityManagerContractAddress,
  provider,
)

enum RelayerRelayErrorCodes {
  AlreadyTransited = '3',
  EntryNotFound = '5',
}

const validateStateStatusCode = (statusCode: string) => {
  switch (statusCode) {
    case RelayerRelayErrorCodes.AlreadyTransited:
      return true
    case RelayerRelayErrorCodes.EntryNotFound:
      return false
    default:
      return false
  }
}

const handleStateValidatingError = (error: unknown) => {
  return validateStateStatusCode(String(get(error, 'response.data.code')))
}

const waitTx = async (txHash: string) => {
  const txReceipt = await provider?.getTransaction(txHash)

  await txReceipt?.wait?.()
}

const isClaimStateValid = async (merkle_root: string) => {
  try {
    const { data } = await fetcher.post<{
      tx: string
    }>(
      `${
        import.meta.env.VITE_RARIMO_CORE_API_URL
      }/integrations/relayer-wc/state/relay`,
      {
        body: {
          hash: merkle_root,
          chain:
            RELAYER_RELAY_CHAIN_NAMES[
              import.meta.env.VITE_DEFAULT_CHAIN as SUPPORTED_CHAINS
            ],
        },
      },
    )

    if (!data?.tx) throw new Error('tx is not defined')

    await waitTx(data?.tx)

    return true
  } catch (error) {
    // TODO: if error === 400(3) how should we wait transit tx?
    return handleStateValidatingError(error)
  }
}

const getClaimStatesValidity = async (merkleRoot: string) => {
  let isMerkleRootValid = false

  let triesCount = 0

  do {
    isMerkleRootValid = await isClaimStateValid(merkleRoot)

    if (!isMerkleRootValid) {
      await sleep(5_000)
      triesCount++
    }
  } while (!isMerkleRootValid && triesCount < (60_000 * 5) / 5_000)

  return isMerkleRootValid
}

class InvalidRootError extends Error {
  constructor() {
    super('Root is not valid')
  }
}

class StateNotExistError extends Error {
  constructor() {
    super('State is not exist')
  }
}

test('root should be valid', async () => {
  const root =
    '0x0357aeaa0c164112ea898f9e0dee7d2371097bbe6ff4808620e1ebda4c40336e'

  try {
    if (!(await getClaimStatesValidity(root))) {
      throw new InvalidRootError()
    }

    const { isValid } = await contractInstance.getRootInfo(
      ethers.BigNumber.from(root),
    )

    expect(isValid).toBe(true)
  } catch (error) {
    if (error instanceof InvalidRootError) {
      throw error
    }

    throw new StateNotExistError()
  }
}, 60_000)
