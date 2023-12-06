import './styles.scss'

import { config } from '@config'
import { PROVIDERS } from '@distributedlab/w3p'
import { IDKitWidget } from '@worldcoin/idkit'
import { FC, HTMLAttributes, useCallback } from 'react'

import { AppButton, Loader } from '@/common'
import { useWeb3Context, useZkpContext } from '@/contexts'
import { ErrorHandler } from '@/helpers'

type Props = HTMLAttributes<HTMLDivElement>

const AuthProof: FC<Props> = () => {
  const { isPending, handleZkProofGen } = useZkpContext()

  const { provider, init } = useWeb3Context()

  const connectProvider = useCallback(async () => {
    try {
      await init(PROVIDERS.Metamask)
    } catch (error) {
      ErrorHandler.process(error)
    }
  }, [init])

  return (
    <div className='auth-proof'>
      {isPending ? (
        <>
          <div className='auth-proof__header'>
            <h2 className='auth-proof__header-title'>{`Check Transition states`}</h2>
            <span className='auth-proof__header-subtitle'>{`Please wait...`}</span>
          </div>

          <div className='auth-proof__loader-wrp'>
            <Loader className='auth-proof__loader' />
          </div>
        </>
      ) : (
        <>
          <div className='auth-proof__header'>
            <h2 className='auth-proof__header-title'>{`Generate Proof`}</h2>
            <span className='auth-proof__header-subtitle'>{`Scan QR Code`}</span>
          </div>

          <div className='auth-proof__card'>
            <div className='auth-proof__card-header'>
              <div className='auth-proof__card-qr-wrp'>
                {provider?.isConnected && provider?.address ? (
                  <IDKitWidget
                    signal={provider.address}
                    action='your-action'
                    onSuccess={handleZkProofGen}
                    app_id={config.WORLDCOIN_APP_ID}
                  >
                    {({ open }) => (
                      <AppButton text={'verify with world id'} onClick={open} />
                    )}
                  </IDKitWidget>
                ) : (
                  <>
                    <AppButton
                      className='auth-proof__connect-btn'
                      text={'CONNECT METAMASK'}
                      onClick={connectProvider}
                    >
                      {`Connect Wallet`}
                    </AppButton>
                  </>
                )}
              </div>
            </div>
            <div className='auth-proof__card-body'>
              <div className='auth-proof__card-title'>
                {`Scan the QR code with your Worldcoin wallet to generate proof`}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AuthProof
