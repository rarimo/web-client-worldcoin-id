import { ClaimTypes } from '@/contexts/ZkpContext/enums'

export const CLAIM_TYPES_CHECKS_VALUES_MAP: Record<ClaimTypes, unknown> = {
  [ClaimTypes.KYCAgeCredential]: '2002.01.01',
}

export const CLAIM_TYPES_MAP_OFF_CHAIN: Record<ClaimTypes, unknown> = {
  [ClaimTypes.KYCAgeCredential]: {
    id: 1,
    circuitId: 'credentialAtomicQueryMTPV2',
    query: {
      allowedIssuers: ['*'],
      context:
        'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld',
      credentialSubject: {
        birthday: {
          $lt: +String(
            CLAIM_TYPES_CHECKS_VALUES_MAP[ClaimTypes.KYCAgeCredential],
          ).replaceAll('.', ''),
        },
      },
      type: ClaimTypes.KYCAgeCredential,
    },
  },
}

export const CLAIM_TYPES_MAP_ON_CHAIN: Record<ClaimTypes, unknown> = {
  [ClaimTypes.KYCAgeCredential]: {
    id: 1,
    circuitId: 'credentialAtomicQueryMTPV2OnChain',
    query: {
      allowedIssuers: ['*'],
      context:
        'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld',
      credentialSubject: {
        birthday: {
          $lt: +String(
            CLAIM_TYPES_CHECKS_VALUES_MAP[ClaimTypes.KYCAgeCredential],
          ).replaceAll('.', ''),
        },
      },
      type: ClaimTypes.KYCAgeCredential,
    },
  },
}
