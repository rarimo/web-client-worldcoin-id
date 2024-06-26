import type { Chain } from '@distributedlab/w3p'
import { LogLevelDesc } from 'loglevel'

import FALLBACK_SUPPORTED_CHAINS from '@/assets/fallback-supported-chains.json'

import packageJson from '../package.json'

export type SUPPORTED_CHAINS = keyof typeof FALLBACK_SUPPORTED_CHAINS

type ContractAddresses = {
  [k in
    | `SEMAPHORE_VERIFIER_CONTRACT_ADDRESS_${SUPPORTED_CHAINS}`
    | `IDENTITY_MANAGER_CONTRACT_ADDRESS_${SUPPORTED_CHAINS}`]: string
}

export const RELAYER_RELAY_CHAIN_NAMES: Record<SUPPORTED_CHAINS, string> = {
  SEPOLIA: 'Sepolia',
  POLYGON: 'Polygon',
  POLYGON_TESTNET: 'Mumbai',
  MAINNET: 'Ethereum',
  ARBITRUM: 'Arbitrum',
  XDC: 'Xdc',
  AVALANCHE: 'Avalanche',
  FUJI: 'Fuji',
}

export const config: {
  API_URL: string
  APP_NAME: string
  LOG_LEVEL: LogLevelDesc
  BUILD_VERSION: string

  WORLDCOIN_APP_ID: `app_${string}`

  RARIMO_CORE_API_URL: string

  SUPPORTED_CHAINS_DETAILS: Record<
    keyof typeof FALLBACK_SUPPORTED_CHAINS,
    Chain
  >

  DEFAULT_CHAIN: SUPPORTED_CHAINS
} & Partial<ContractAddresses> = {
  API_URL: import.meta.env.VITE_API_URL,
  APP_NAME: import.meta.env.VITE_APP_NAME,
  LOG_LEVEL: 'trace' as LogLevelDesc,
  BUILD_VERSION: packageJson.version || import.meta.env.VITE_APP_BUILD_VERSION,

  WORLDCOIN_APP_ID: import.meta.env.VITE_WORLDCOIN_APP_ID,

  RARIMO_CORE_API_URL: import.meta.env.VITE_RARIMO_CORE_API_URL,

  SUPPORTED_CHAINS_DETAILS: (import.meta.env.VITE_SUPPORTED_CHAINS_DETAILS
    ? JSON.parse(import.meta.env.VITE_SUPPORTED_CHAINS_DETAILS)
    : FALLBACK_SUPPORTED_CHAINS) as Record<
    keyof typeof FALLBACK_SUPPORTED_CHAINS,
    Chain
  >,

  DEFAULT_CHAIN: import.meta.env.VITE_DEFAULT_CHAIN as SUPPORTED_CHAINS,

  /* eslint-enable */
}

Object.assign(config, {
  ...(Object.keys(config.SUPPORTED_CHAINS_DETAILS).reduce(
    (acc, curr) => ({
      ...acc,
      /* eslint-disable max-len */
      /* prettier-ignore */
      [`SEMAPHORE_VERIFIER_CONTRACT_ADDRESS_${curr}`]: import.meta.env[`VITE_SEMAPHORE_VERIFIER_CONTRACT_ADDRESS_${curr}`] || '',
      /* prettier-ignore */
      [`IDENTITY_MANAGER_CONTRACT_ADDRESS_${curr}`]: import.meta.env[`VITE_IDENTITY_MANAGER_CONTRACT_ADDRESS_${curr}`] || '',
    }),
    {},
  ) as {
    [k in
      | `SEMAPHORE_VERIFIER_CONTRACT_ADDRESS_${SUPPORTED_CHAINS}`
      | `IDENTITY_MANAGER_CONTRACT_ADDRESS_${SUPPORTED_CHAINS}`]: string
  }),
})
