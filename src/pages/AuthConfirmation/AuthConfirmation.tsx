import './styles.scss'

import {
  Chain,
  errors,
  type EthTransactionResponse,
  PROVIDERS,
} from '@distributedlab/w3p'
import { BigNumber, utils } from 'ethers'
import { FC, HTMLAttributes, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import loaderJson from '@/assets/animations/loader.json'
import { Animation, AppButton, ChainIcon, Dropdown, Icon } from '@/common'
import { config, SUPPORTED_CHAINS } from '@/config'
import { useWeb3Context, useZkpContext } from '@/contexts'
import { ICON_NAMES, RoutesPaths } from '@/enums'
import { createIdentityManager, ErrorHandler } from '@/helpers'

type Props = HTMLAttributes<HTMLDivElement>

const AuthConfirmation: FC<Props> = () => {
  const navigate = useNavigate()

  const { zkProof, verificationSuccessTx } = useZkpContext()
  const { provider, init } = useWeb3Context()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const [selectedChainToPublish, setSelectedChainToPublish] =
    useState<SUPPORTED_CHAINS>(config.DEFAULT_CHAIN)

  const selectedChainToPublishDetails = useMemo(() => {
    return config.SUPPORTED_CHAINS_DETAILS[selectedChainToPublish]
  }, [selectedChainToPublish])

  const chainsToSwitch = useMemo(
    () =>
      (
        Object.keys(
          config.SUPPORTED_CHAINS_DETAILS,
        ) as (keyof typeof config.SUPPORTED_CHAINS_DETAILS)[]
      )?.filter(el =>
        Boolean(config?.[`SEMAPHORE_VERIFIER_CONTRACT_ADDRESS_${el}`]),
      ),
    [],
  )

  const submitZkp = useCallback(async () => {
    setIsSubmitting(true)

    try {
      if (!zkProof) throw new TypeError('ZKP is not defined')

      if (!provider?.address || !provider.rawProvider)
        throw new TypeError('Provider is not defined')

      const hashToField = (value: string) => {
        return BigNumber.from(
          utils.keccak256(utils.solidityPack(['bytes'], [value])),
        ).shr(8)
      }

      const externalNullifierHash = hashToField(
        utils.solidityPack(
          ['uint256', 'string'],
          [
            hashToField(
              utils.solidityPack(['string'], [config.WORLDCOIN_APP_ID]),
            ).toHexString(),
            'your-action',
          ],
        ),
      )

      const unpackedProof = utils.defaultAbiCoder.decode(
        ['uint256[8]'],
        zkProof.proof,
      )[0]

      const identityManagerContract = createIdentityManager(
        '',
        provider.rawProvider,
      )

      const txBody =
        identityManagerContract.contractInterface.encodeFunctionData(
          'verifyProof',
          [
            zkProof.merkle_root,
            hashToField(provider.address).toHexString(),
            zkProof.nullifier_hash,
            externalNullifierHash.toHexString(),
            unpackedProof.map((el: unknown) =>
              BigNumber.from(el).toHexString(),
            ),
          ],
        )

      const tx = await provider?.signAndSendTx?.({
        to: config?.[
          `SEMAPHORE_VERIFIER_CONTRACT_ADDRESS_${selectedChainToPublish}`
        ],
        data: txBody,
      })

      verificationSuccessTx.set((tx as EthTransactionResponse).transactionHash)

      navigate(RoutesPaths.authSuccess)
    } catch (error) {
      ErrorHandler.process(error)
    }

    setIsSubmitting(false)
  }, [
    zkProof,
    navigate,
    provider,
    selectedChainToPublish,
    verificationSuccessTx,
  ])

  const providerChainId = useMemo(() => provider?.chainId, [provider?.chainId])

  const isProviderValidChain = useMemo(() => {
    if (!providerChainId) return false

    return +providerChainId === +selectedChainToPublishDetails.id
  }, [providerChainId, selectedChainToPublishDetails?.id])

  const connectWallet = useCallback(async () => {
    try {
      await init(PROVIDERS.Metamask)
    } catch (error) {
      ErrorHandler.process(error)
    }
  }, [init])

  const tryAddChain = useCallback(async () => {
    try {
      await provider?.addChain?.(selectedChainToPublishDetails)
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error)
    }
  }, [provider, selectedChainToPublishDetails])

  const trySwitchChain = useCallback(
    async (chain?: Chain) => {
      try {
        const chainToSwitch = chain || selectedChainToPublishDetails
        await provider?.switchChain?.(Number(chainToSwitch.id))
      } catch (error) {
        if (error instanceof errors.ProviderChainNotFoundError) {
          await tryAddChain()
        } else {
          throw error
        }
      }
    },
    [provider, selectedChainToPublishDetails, tryAddChain],
  )

  const handleSelectChain = useCallback(
    async (chain: SUPPORTED_CHAINS) => {
      try {
        setIsDropdownOpen(false)
        await trySwitchChain(config.SUPPORTED_CHAINS_DETAILS[chain])
        setSelectedChainToPublish(chain)
      } catch (error) {
        ErrorHandler.processWithoutFeedback(error)
      }
    },
    [trySwitchChain],
  )

  return (
    <div className='auth-confirmation'>
      <div className='auth-confirmation__header'>
        <div className='auth-confirmation__header-icon-wrp'>
          <Icon
            className='auth-confirmation__header-icon'
            name={ICON_NAMES.check}
          />
        </div>
        <h2 className='auth-confirmation__header-title'>{`Proof Generated`}</h2>
        <span className='auth-confirmation__header-subtitle'>
          {`Proof is generated using Zero-Knowledge Proof (ZKP) and none of the personal info is shared with any party`}
        </span>
      </div>

      {isSubmitting ? (
        <div className='auth-confirmation__card'>
          <div className='auth-confirmation__loader-wrp'>
            <div className='auth-confirmation__loader-animation'>
              <Animation source={loaderJson} />
            </div>
            <span className='auth-confirmation__loader-title'>
              {`Ensuring all the necessary data is in place before submitting the proof...`}
            </span>
            <span className='auth-confirmation__loader-subtitle'>
              {`Submitting transaction`}
            </span>
          </div>
        </div>
      ) : (
        <div className='auth-confirmation__card'>
          <div className='auth-confirmation__chain-preview'>
            <div className='auth-confirmation__chain-preview-icon-wrp'>
              <ChainIcon
                className='auth-confirmation__chain-preview-icon'
                chain={selectedChainToPublish}
              />
            </div>

            <span className='auth-confirmation__chain-preview-title'>
              {`Your proof will be submitted on ${config.SUPPORTED_CHAINS_DETAILS[selectedChainToPublish].name} chain`}
            </span>
          </div>

          {chainsToSwitch?.length > 1 ? (
            <Dropdown
              isOpen={isDropdownOpen}
              setIsOpen={setIsDropdownOpen}
              head={
                <AppButton
                  className='auth-confirmation__chains-switch-btn'
                  scheme='none'
                  modification='none'
                  iconLeft={ICON_NAMES.plus}
                  text={`Switch chain`}
                  onClick={() => setIsDropdownOpen(prev => !prev)}
                />
              }
            >
              <div className='auth-confirmation__chains'>
                {chainsToSwitch?.map?.((el, idx) => (
                  <button
                    key={idx}
                    className='auth-confirmation__chain-item'
                    onClick={() => handleSelectChain(el)}
                  >
                    <ChainIcon
                      className='auth-confirmation__chain-item-icon'
                      chain={el}
                    />
                    <span className='auth-confirmation__chain-item-title'>
                      {config.SUPPORTED_CHAINS_DETAILS[el].name}
                    </span>
                  </button>
                ))}
              </div>
            </Dropdown>
          ) : (
            <></>
          )}

          {provider?.isConnected ? (
            isProviderValidChain ? (
              <AppButton
                className='auth-confirmation__submit-btn'
                text={`SUBMIT PROOF`}
                iconRight={ICON_NAMES.arrowRight}
                size='large'
                onClick={submitZkp}
              />
            ) : (
              <AppButton
                className='auth-confirmation__submit-btn'
                text={`SWITCH NETWORK`}
                iconRight={ICON_NAMES.switchHorizontal}
                size='large'
                onClick={() => trySwitchChain()}
              />
            )
          ) : (
            <AppButton
              className='auth-confirmation__submit-btn'
              text={`CONNECT WALLET`}
              iconRight={ICON_NAMES.metamask}
              size='large'
              onClick={connectWallet}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default AuthConfirmation
