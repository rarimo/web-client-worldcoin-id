/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  SemaphoreVerifier,
  SemaphoreVerifierInterface,
} from "../SemaphoreVerifier";

const _abi = [
  {
    inputs: [],
    name: "ProofInvalid",
    type: "error",
  },
  {
    inputs: [],
    name: "PublicInputNotInField",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256[8]",
        name: "proof",
        type: "uint256[8]",
      },
    ],
    name: "compressProof",
    outputs: [
      {
        internalType: "uint256[4]",
        name: "compressed",
        type: "uint256[4]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[4]",
        name: "compressedProof",
        type: "uint256[4]",
      },
      {
        internalType: "uint256[4]",
        name: "input",
        type: "uint256[4]",
      },
    ],
    name: "verifyCompressedProof",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[8]",
        name: "proof",
        type: "uint256[8]",
      },
      {
        internalType: "uint256[4]",
        name: "input",
        type: "uint256[4]",
      },
    ],
    name: "verifyProof",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class SemaphoreVerifier__factory {
  static readonly abi = _abi;
  static createInterface(): SemaphoreVerifierInterface {
    return new utils.Interface(_abi) as SemaphoreVerifierInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SemaphoreVerifier {
    return new Contract(address, _abi, signerOrProvider) as SemaphoreVerifier;
  }
}
