import { JsonApiClient } from '@distributedlab/jac'

export let api: JsonApiClient
export let rarimoCoreApi: JsonApiClient

export const initApi = (baseUrl: string) => {
  api = new JsonApiClient({
    baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'omit',
  })
}

export const initRarimoCoreApi = (baseUrl: string) => {
  rarimoCoreApi = new JsonApiClient({
    baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'omit',
  })
}
