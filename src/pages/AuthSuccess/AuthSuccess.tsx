import './styles.scss'

import { config } from '@config'
import { FC, HTMLAttributes } from 'react'

import { AppButton, Icon } from '@/common'
import { useWeb3Context, useZkpContext } from '@/contexts'
import { ICON_NAMES } from '@/enums'
import { abbrCenter } from '@/helpers'

type Props = HTMLAttributes<HTMLDivElement>

const AuthSuccess: FC<Props> = () => {
  const { provider } = useWeb3Context()
  const { verificationSuccessTx } = useZkpContext()

  return (
    <div className='auth-success'>
      <div className='auth-success__header'>
        <div className='auth-success__header-icon-wrp'>
          <Icon className='auth-success__header-icon' name={ICON_NAMES.check} />
        </div>
        <h2 className='auth-success__header-title'>{`Proof Submitted`}</h2>
      </div>

      <div className='auth-success__card'>
        <span className='auth-success__card-title'>{`Check transaction`}</span>

        <a
          className='auth-success__copy-field-wrp'
          href={provider?.getTxUrl?.(
            config.SUPPORTED_CHAINS_DETAILS[config.DEFAULT_CHAIN],
            verificationSuccessTx.get,
          )}
          target='_blank'
          rel='noreferrer'
        >
          <span className='auth-success__copy-field'>
            {abbrCenter(verificationSuccessTx.get, 10)}
            <Icon
              className='auth-success__copy-field-icon'
              name={ICON_NAMES.externalLink}
            />
          </span>
        </a>
      </div>

      {/* eslint-disable */}
      {/*<div className='auth-success__minted-nft'>*/}
      {/*  <span className='auth-success__minted-nft-title'>*/}
      {/*    {`You’ve received the SBT `}*/}
      {/*  </span>*/}

      {/*  <div className='auth-success__minted-nft-card'>*/}
      {/*    <div className='auth-success__minted-nft-card-img-wrp'>*/}
      {/*      <img*/}
      {/*        src='/images/minted-sbt-stub.png'*/}
      {/*        alt=''*/}
      {/*        className='auth-success__minted-nft-card-img'*/}
      {/*      />*/}
      {/*    </div>*/}

      {/*    <div className='auth-success__minted-nft-card-details'>*/}
      {/*      <span className='auth-success__minted-nft-card-title'>*/}
      {/*        {`PolygonID × Rarimo`}*/}
      {/*      </span>*/}

      {/*      {config?.[*/}
      {/*        `VERIFIED_SBT_CONTRACT_ADDRESS_${config.DEFAULT_CHAIN}`*/}
      {/*      ] ? (*/}
      {/*        <span className='auth-success__minted-nft-card-subtitle'>*/}
      {/*          <a*/}
      {/*            href={provider?.getAddressUrl?.(*/}
      {/*              config.SUPPORTED_CHAINS_DETAILS[config.DEFAULT_CHAIN],*/}
      {/*              config[*/}
      {/*                `VERIFIED_SBT_CONTRACT_ADDRESS_${config.DEFAULT_CHAIN}`*/}
      {/*              ] ?? '',*/}
      {/*            )}*/}
      {/*            target={'_blank'}*/}
      {/*            rel='noreferrer'*/}
      {/*          >*/}
      {/*            {abbrCenter(*/}
      {/*              config[*/}
      {/*                `VERIFIED_SBT_CONTRACT_ADDRESS_${config.DEFAULT_CHAIN}`*/}
      {/*              ] ?? '',*/}
      {/*            )}*/}
      {/*          </a>*/}
      {/*        </span>*/}
      {/*      ) : (*/}
      {/*        <></>*/}
      {/*      )}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/* eslint-enable */}

      <AppButton
        className='auth-success__return-btn'
        routePath={'/'}
        text={`RETURN HOME`}
        size={`large`}
      />
    </div>
  )
}

export default AuthSuccess
