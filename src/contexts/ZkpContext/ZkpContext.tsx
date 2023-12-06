import { config, RELAYER_RELAY_CHAIN_NAMES } from '@config'
import { fetcher, FetcherError } from '@distributedlab/fetcher'
import { Token, type ZKProof } from '@iden3/js-jwz'
import { type ISuccessResult } from '@worldcoin/idkit'
import { BigNumber, providers } from 'ethers'
import { createContext, FC, HTMLAttributes, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffectOnce } from 'react-use'

import { useWeb3Context } from '@/contexts'
import { RoutesPaths } from '@/enums'
import { sleep } from '@/helpers'

interface ZkpContextValue {
  isPending?: boolean

  jwzToken?: Token
  verificationSuccessTx: {
    get: string
    set: (tx: string) => void
  }
  handleZkProofGen: (zkProof: ISuccessResult) => void
}

export const zkpContext = createContext<ZkpContextValue>({
  verificationSuccessTx: {
    get: '',
    set: () => {
      throw new TypeError('verificationSuccessTx is not defined')
    },
  },
  handleZkProofGen: () => {
    throw new TypeError('setZkProof is not defined')
  },
})

type Props = HTMLAttributes<HTMLDivElement>

enum RelayerRelayErrorCodes {
  AlreadyTransited = '3',
  EntryNotFound = '5',
}

const ZkpContextProvider: FC<Props> = ({ children, ...rest }) => {
  const navigate = useNavigate()

  const [isPending, setIsPending] = useState(false)

  const [zkProof, setZkProof] = useState<ISuccessResult>()
  const [jwzToken, setJwzToken] = useState<Token>()
  const [verificationSuccessTx, setVerificationSuccessTx] = useState<string>('')

  const { provider } = useWeb3Context()

  const validateStateStatusCode = useCallback((statusCode: string) => {
    switch (statusCode) {
      case RelayerRelayErrorCodes.AlreadyTransited:
        return true
      case RelayerRelayErrorCodes.EntryNotFound:
        return false
      default:
        return false
    }
  }, [])

  const waitTx = useCallback(
    async (txHash: string) => {
      const rawProvider = new providers.Web3Provider(
        provider?.rawProvider as providers.ExternalProvider,
      )

      const txReceipt = await rawProvider?.getTransaction(txHash)

      await txReceipt?.wait?.()
    },
    [provider?.rawProvider],
  )

  const handleStateValidatingError = useCallback(
    (error: unknown) => {
      if (!(error instanceof FetcherError)) throw error

      if (!('code' in error.response.data)) throw error

      return validateStateStatusCode(String(error.response.data.code))
    },
    [validateStateStatusCode],
  )

  const isClaimStateValid = useCallback(
    async (claimStateHex: string) => {
      try {
        const { data } = await fetcher.post<{
          tx: string
        }>(`${config.RARIMO_CORE_API_URL}/integrations/relayer/state/relay`, {
          body: {
            hash: claimStateHex,
            chain: RELAYER_RELAY_CHAIN_NAMES[config.DEFAULT_CHAIN],
          },
        })

        if (!data?.tx) throw new Error('tx is not defined')

        await waitTx(data?.tx)

        return false
      } catch (error) {
        return handleStateValidatingError(error)
      }
    },
    [handleStateValidatingError, waitTx],
  )

  const isGistStateValid = useCallback(
    async (gistStateHash: string) => {
      try {
        const { data } = await fetcher.post<{
          tx: string
        }>(`${config.RARIMO_CORE_API_URL}/integrations/relayer/gist/relay`, {
          body: {
            hash: gistStateHash,
            chain: RELAYER_RELAY_CHAIN_NAMES[config.DEFAULT_CHAIN],
          },
        })

        if (!data?.tx) throw new Error('tx is not defined')

        await waitTx(data?.tx)

        return false
      } catch (error) {
        return handleStateValidatingError(error)
      }
    },
    [handleStateValidatingError, waitTx],
  )

  const getClaimStatesValidity = useCallback(
    async (issuerClaimStateHex: string, issuerClaimNonRevStateHex: string) => {
      let isIssuerClaimStateHexValid = false
      let isIssuerClaimNonRevStateHexValid = false

      let triesCount = 0

      do {
        isIssuerClaimStateHexValid = await isClaimStateValid(
          issuerClaimStateHex,
        )

        await sleep(500)

        isIssuerClaimNonRevStateHexValid = await isClaimStateValid(
          issuerClaimNonRevStateHex,
        )

        if (!isIssuerClaimStateHexValid && !isIssuerClaimNonRevStateHexValid) {
          await sleep(5_000)
          triesCount++
        }
      } while (
        !isIssuerClaimStateHexValid &&
        !isIssuerClaimNonRevStateHexValid &&
        triesCount < (60_000 * 5) / 5_000
      )

      return {
        isIssuerClaimStateHexValid,
        isIssuerClaimNonRevStateHexValid,
      }
    },
    [isClaimStateValid],
  )

  const getGistStateValidity = useCallback(
    async (issuerGistHashStateHex: string) => {
      let isIssuerGistHashStateHexValid = false

      let triesCount = 0

      do {
        isIssuerGistHashStateHexValid = await isGistStateValid(
          issuerGistHashStateHex,
        )

        if (!isIssuerGistHashStateHexValid) {
          await sleep(5_000)
          triesCount++
        }
      } while (
        !isIssuerGistHashStateHexValid &&
        triesCount < (60_000 * 5) / 5_000
      )

      return isIssuerGistHashStateHexValid
    },
    [isGistStateValid],
  )

  const isStateTransitionValid = useCallback(
    async (jwzToken: Token): Promise<boolean> => {
      const zkProofPayload = JSON.parse(jwzToken.getPayload())

      const zkProof = zkProofPayload.body.scope[0] as ZKProof

      const issuerClaimState = zkProof.pub_signals[7]
      const issuerClaimNonRevState = zkProof.pub_signals[9]
      const issuerGistHash = zkProof.pub_signals[5]

      const issuerClaimStateHex = BigNumber.from(issuerClaimState).toHexString()

      const issuerClaimNonRevStateHex = BigNumber.from(
        issuerClaimNonRevState,
      ).toHexString()

      const issuerGistHashStateHex =
        BigNumber.from(issuerGistHash).toHexString()

      const { isIssuerClaimStateHexValid, isIssuerClaimNonRevStateHexValid } =
        await getClaimStatesValidity(
          issuerClaimStateHex,
          issuerClaimNonRevStateHex,
        )

      await sleep(5_000)

      const isIssuerGistHashStateHexValid = await getGistStateValidity(
        issuerGistHashStateHex,
      )

      return (
        (isIssuerClaimStateHexValid || isIssuerClaimNonRevStateHexValid) &&
        isIssuerGistHashStateHexValid
      )
    },
    [getClaimStatesValidity, getGistStateValidity],
  )

  const handleZkProofGen = useCallback((zkProof: ISuccessResult) => {
    console.log(zkProof)
  }, [])

  useEffectOnce(() => {
    if (!jwzToken && !verificationSuccessTx) {
      navigate(RoutesPaths.app)
    }
  })

  return (
    <zkpContext.Provider
      value={{
        isPending,

        jwzToken,

        verificationSuccessTx: {
          get: verificationSuccessTx,
          set: setVerificationSuccessTx,
        },
        handleZkProofGen,
      }}
      {...rest}
    >
      {children}
    </zkpContext.Provider>
  )
}

export default ZkpContextProvider
