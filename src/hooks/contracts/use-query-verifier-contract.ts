import { BigNumberish } from 'ethers'
import { useCallback, useMemo } from 'react'

import { QueryVerifier__factory } from '@/types'

export const useQueryVerifierContract = () => {
  const contractInterface = useMemo(
    () => QueryVerifier__factory.createInterface(),
    [],
  )

  const getProveIdentityTxBody = useCallback(
    (
      root_: BigNumberish,
      signalHash_: BigNumberish,
      nullifierHash_: BigNumberish,
      externalNullifierHash_: BigNumberish,
      proof_: BigNumberish[],
    ) => {
      const data = contractInterface.encodeFunctionData('verifyProof', [
        root_,
        signalHash_,
        nullifierHash_,
        externalNullifierHash_,
        proof_,
      ])

      return {
        data,
      }
    },
    [contractInterface],
  )

  return {
    getProveIdentityTxBody,
  }
}
