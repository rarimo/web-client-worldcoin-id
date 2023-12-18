/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { QueryVerifier, QueryVerifierInterface } from "../QueryVerifier";

const _abi = [
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error",
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "semaphoreVerifier_",
        type: "address",
      },
      {
        internalType: "address",
        name: "identityManager_",
        type: "address",
      },
    ],
    name: "__Verifier_init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "identityManager",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "semaphoreVerifier",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "root_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "signalHash_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "nullifierHash_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "externalNullifierHash_",
        type: "uint256",
      },
      {
        internalType: "uint256[8]",
        name: "proof_",
        type: "uint256[8]",
      },
    ],
    name: "verifyProof",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class QueryVerifier__factory {
  static readonly abi = _abi;
  static createInterface(): QueryVerifierInterface {
    return new utils.Interface(_abi) as QueryVerifierInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): QueryVerifier {
    return new Contract(address, _abi, signerOrProvider) as QueryVerifier;
  }
}
