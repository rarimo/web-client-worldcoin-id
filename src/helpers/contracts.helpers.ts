import type { RawProvider } from '@distributedlab/w3p'
import type { Provider } from '@ethersproject/providers'
import { providers, Signer } from 'ethers'

import { IdentityManager__factory, SemaphoreVerifier__factory } from '@/types'

type AbstractFactoryClass = {
  connect: (address: string, signerOrProvider: Signer | Provider) => unknown
  createInterface: () => unknown
}

type AbstractFactoryClassReturnType<F extends AbstractFactoryClass> = {
  contractInstance: ReturnType<F['connect']>
  contractInterface: ReturnType<F['createInterface']>
}

const createContract = <F extends AbstractFactoryClass>(
  address: string,
  provider: RawProvider,
  factoryClass: F,
): AbstractFactoryClassReturnType<F> => {
  const contractInstance = factoryClass.connect(
    address,
    new providers.Web3Provider(provider as providers.ExternalProvider, 'any'),
  ) as ReturnType<F['connect']>

  const contractInterface = factoryClass.createInterface() as ReturnType<
    F['createInterface']
  >

  return {
    contractInstance,
    contractInterface,
  }
}

export const createIdentityManager = (
  address: string,
  provider: RawProvider,
) => {
  return createContract(address, provider, IdentityManager__factory)
}

export const createSemaphoreVerifier = (
  address: string,
  provider: RawProvider,
) => {
  return createContract(address, provider, SemaphoreVerifier__factory)
}
