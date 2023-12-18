import { fetcher } from '@distributedlab/fetcher'
import { type ISuccessResult } from '@worldcoin/idkit'
import { providers } from 'ethers'
import get from 'lodash/get'
import { createContext, FC, HTMLAttributes, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffectOnce } from 'react-use'

import { config, RELAYER_RELAY_CHAIN_NAMES } from '@/config'
import { useWeb3Context } from '@/contexts'
import { RoutesPaths } from '@/enums'
import { bus, BUS_EVENTS, sleep } from '@/helpers'

interface ZkpContextValue {
  isPending?: boolean

  zkProof?: ISuccessResult

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
      return validateStateStatusCode(String(get(error, 'response.data.code')))
    },
    [validateStateStatusCode],
  )

  const isClaimStateValid = useCallback(
    async (merkle_root: string) => {
      try {
        const { data } = await fetcher.post<{
          tx: string
        }>(
          `${config.RARIMO_CORE_API_URL}/integrations/relayer-wc/state/relay`,
          {
            body: {
              hash: merkle_root,
              chain: RELAYER_RELAY_CHAIN_NAMES[config.DEFAULT_CHAIN],
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
    },
    [handleStateValidatingError, waitTx],
  )

  const getClaimStatesValidity = useCallback(
    async (merkleRoot: string) => {
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
    },
    [isClaimStateValid],
  )

  const isStateTransitionValid = useCallback(
    async (zkProof: ISuccessResult): Promise<boolean> => {
      const isMerkleRootValid = await getClaimStatesValidity(
        zkProof.merkle_root,
      )

      return isMerkleRootValid
    },
    [getClaimStatesValidity],
  )

  const handleZkProofGen = useCallback(
    async (zkProof: ISuccessResult) => {
      setIsPending(true)

      setZkProof(zkProof)

      if (!(await isStateTransitionValid(zkProof))) {
        setIsPending(false)

        bus.emit(BUS_EVENTS.error, `State transition is not valid`)

        return
      }

      navigate(RoutesPaths.authConfirmation)

      setIsPending(false)
    },
    [isStateTransitionValid, navigate],
  )

  useEffectOnce(() => {
    if (!zkProof && !verificationSuccessTx) {
      navigate(RoutesPaths.app)
    }
  })

  return (
    <zkpContext.Provider
      value={{
        isPending,

        zkProof,

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
