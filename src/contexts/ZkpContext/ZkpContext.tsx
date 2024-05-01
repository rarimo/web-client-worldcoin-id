import { type ISuccessResult } from '@worldcoin/idkit'
import { createContext, FC, HTMLAttributes, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffectOnce } from 'react-use'

import { config, RELAYER_RELAY_CHAIN_NAMES } from '@/config'
import { isStateReplicated } from '@/contexts/ZkpContext/helpers'
import { RoutesPaths } from '@/enums'
import { bus, BUS_EVENTS } from '@/helpers'

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

const ZkpContextProvider: FC<Props> = ({ children, ...rest }) => {
  const navigate = useNavigate()

  const [isPending, setIsPending] = useState(false)

  const [zkProof, setZkProof] = useState<ISuccessResult>()
  const [verificationSuccessTx, setVerificationSuccessTx] = useState<string>('')

  const handleZkProofGen = useCallback(
    async (zkProof: ISuccessResult) => {
      setIsPending(true)

      setZkProof(zkProof)

      if (
        !(await isStateReplicated(
          zkProof.merkle_root,
          config.RARIMO_CORE_API_URL,
          RELAYER_RELAY_CHAIN_NAMES[config.DEFAULT_CHAIN],
        ))
      ) {
        setIsPending(false)

        bus.emit(BUS_EVENTS.error, `State transition is not valid`)

        return
      }

      navigate(RoutesPaths.authConfirmation)

      setIsPending(false)
    },
    [navigate],
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
