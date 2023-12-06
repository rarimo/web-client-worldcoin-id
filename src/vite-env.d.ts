/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_ENVIRONMENT: string
  VITE_PORT: string
  VITE_API_URL: string
  VITE_APP_NAME: string
  VITE_APP_BUILD_VERSION: string

  VITE_RARIMO_CORE_API_URL: string

  VITE_WALLET_CONNECT_PROJECT_ID: string

  VITE_AUTH_BJJ_CREDENTIAL_HASH: string

  VITE_REQUEST_BUILD_SENDER: string

  VITE_DEFAULT_CHAIN: string

  VITE_CALLBACK_URL: string

  VITE_SUPPORTED_CHAIN_DETAILS: string
}

interface Document {
  ENV: ImportMetaEnv
}
