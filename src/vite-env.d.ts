/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_URL: string
  VITE_APP_NAME: string
  VITE_APP_BUILD_VERSION: string

  VITE_WORLDCOIN_APP_ID: `app_${string}`

  VITE_RARIMO_CORE_API_URL: string

  VITE_DEFAULT_CHAIN: string

  VITE_SUPPORTED_CHAIN_DETAILS: string
}

interface Document {
  ENV: ImportMetaEnv
}
