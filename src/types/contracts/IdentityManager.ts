/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export declare namespace IIdentityManager {
  export type RootInfoStruct = {
    replacedBy: BigNumberish;
    replacedAt: BigNumberish;
    isLatest: boolean;
    isValid: boolean;
  };

  export type RootInfoStructOutput = [
    BigNumber,
    BigNumber,
    boolean,
    boolean
  ] & {
    replacedBy: BigNumber;
    replacedAt: BigNumber;
    isLatest: boolean;
    isValid: boolean;
  };
}

export interface IdentityManagerInterface extends utils.Interface {
  functions: {
    "P()": FunctionFragment;
    "__IdentityManager_init(uint8,address,address,address,string)": FunctionFragment;
    "__Signers_init(address,address,string)": FunctionFragment;
    "chainName()": FunctionFragment;
    "checkSignatureAndIncrementNonce(uint8,address,bytes32,bytes)": FunctionFragment;
    "facade()": FunctionFragment;
    "getRootInfo(uint256)": FunctionFragment;
    "getSigComponents(uint8,address)": FunctionFragment;
    "getTreeDepth()": FunctionFragment;
    "isLatestRoot(uint256)": FunctionFragment;
    "isValidRoot(uint256)": FunctionFragment;
    "latestRoot()": FunctionFragment;
    "nonces(address,uint8)": FunctionFragment;
    "rootExists(uint256)": FunctionFragment;
    "rootHistory(uint256)": FunctionFragment;
    "rootHistoryExpiry()": FunctionFragment;
    "setRootHistoryExpiry(uint256)": FunctionFragment;
    "signedTransitRoot(uint256,uint256,uint256,bytes)": FunctionFragment;
    "signer()": FunctionFragment;
    "sourceStateContract()": FunctionFragment;
    "validateChangeAddressSignature(uint8,address,address,bytes)": FunctionFragment;
    "verifyProof(uint256,uint256,uint256,uint256,uint256[8])": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "P"
      | "__IdentityManager_init"
      | "__Signers_init"
      | "chainName"
      | "checkSignatureAndIncrementNonce"
      | "facade"
      | "getRootInfo"
      | "getSigComponents"
      | "getTreeDepth"
      | "isLatestRoot"
      | "isValidRoot"
      | "latestRoot"
      | "nonces"
      | "rootExists"
      | "rootHistory"
      | "rootHistoryExpiry"
      | "setRootHistoryExpiry"
      | "signedTransitRoot"
      | "signer"
      | "sourceStateContract"
      | "validateChangeAddressSignature"
      | "verifyProof"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "P", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "__IdentityManager_init",
    values: [BigNumberish, string, string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "__Signers_init",
    values: [string, string, string]
  ): string;
  encodeFunctionData(functionFragment: "chainName", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "checkSignatureAndIncrementNonce",
    values: [BigNumberish, string, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "facade", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getRootInfo",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getSigComponents",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getTreeDepth",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isLatestRoot",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isValidRoot",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "latestRoot",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "nonces",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "rootExists",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "rootHistory",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "rootHistoryExpiry",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setRootHistoryExpiry",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "signedTransitRoot",
    values: [BigNumberish, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "signer", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "sourceStateContract",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "validateChangeAddressSignature",
    values: [BigNumberish, string, string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "verifyProof",
    values: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish[]
    ]
  ): string;

  decodeFunctionResult(functionFragment: "P", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "__IdentityManager_init",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "__Signers_init",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "chainName", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "checkSignatureAndIncrementNonce",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "facade", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getRootInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSigComponents",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTreeDepth",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isLatestRoot",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isValidRoot",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "latestRoot", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rootExists", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "rootHistory",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rootHistoryExpiry",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setRootHistoryExpiry",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "signedTransitRoot",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "signer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "sourceStateContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "validateChangeAddressSignature",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verifyProof",
    data: BytesLike
  ): Result;

  events: {
    "Initialized(uint64)": EventFragment;
    "RootAdded(uint256,uint128)": EventFragment;
    "RootHistoryExpirySet(uint256)": EventFragment;
    "SignedRootTransited(uint256,uint256,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RootAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RootHistoryExpirySet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SignedRootTransited"): EventFragment;
}

export interface InitializedEventObject {
  version: BigNumber;
}
export type InitializedEvent = TypedEvent<[BigNumber], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface RootAddedEventObject {
  root: BigNumber;
  timestamp: BigNumber;
}
export type RootAddedEvent = TypedEvent<
  [BigNumber, BigNumber],
  RootAddedEventObject
>;

export type RootAddedEventFilter = TypedEventFilter<RootAddedEvent>;

export interface RootHistoryExpirySetEventObject {
  newExpiry: BigNumber;
}
export type RootHistoryExpirySetEvent = TypedEvent<
  [BigNumber],
  RootHistoryExpirySetEventObject
>;

export type RootHistoryExpirySetEventFilter =
  TypedEventFilter<RootHistoryExpirySetEvent>;

export interface SignedRootTransitedEventObject {
  prevRoot: BigNumber;
  postRoot: BigNumber;
  replacedAt: BigNumber;
  latestRoot: BigNumber;
}
export type SignedRootTransitedEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, BigNumber],
  SignedRootTransitedEventObject
>;

export type SignedRootTransitedEventFilter =
  TypedEventFilter<SignedRootTransitedEvent>;

export interface IdentityManager extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IdentityManagerInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    P(overrides?: CallOverrides): Promise<[BigNumber]>;

    __IdentityManager_init(
      treeDepth_: BigNumberish,
      semaphoreVerifier_: string,
      signer_: string,
      sourceStateContract_: string,
      chainName_: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    __Signers_init(
      signer_: string,
      facade_: string,
      chainName_: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    chainName(overrides?: CallOverrides): Promise<[string]>;

    checkSignatureAndIncrementNonce(
      methodId_: BigNumberish,
      contractAddress_: string,
      signHash_: BytesLike,
      signature_: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    facade(overrides?: CallOverrides): Promise<[string]>;

    getRootInfo(
      root_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[IIdentityManager.RootInfoStructOutput]>;

    getSigComponents(
      methodId_: BigNumberish,
      contractAddress_: string,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { chainName_: string; nonce_: BigNumber }>;

    getTreeDepth(overrides?: CallOverrides): Promise<[number]>;

    isLatestRoot(
      root: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isValidRoot(
      root: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    latestRoot(overrides?: CallOverrides): Promise<[BigNumber]>;

    nonces(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    rootExists(
      root_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    rootHistory(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    rootHistoryExpiry(overrides?: CallOverrides): Promise<[BigNumber]>;

    setRootHistoryExpiry(
      expiryTime_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    signedTransitRoot(
      prevRoot_: BigNumberish,
      postRoot_: BigNumberish,
      replacedAt_: BigNumberish,
      proof_: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    signer(overrides?: CallOverrides): Promise<[string]>;

    sourceStateContract(overrides?: CallOverrides): Promise<[string]>;

    validateChangeAddressSignature(
      methodId_: BigNumberish,
      contractAddress_: string,
      newAddress_: string,
      signature_: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    verifyProof(
      root: BigNumberish,
      signalHash: BigNumberish,
      nullifierHash: BigNumberish,
      externalNullifierHash: BigNumberish,
      proof: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<[void]>;
  };

  P(overrides?: CallOverrides): Promise<BigNumber>;

  __IdentityManager_init(
    treeDepth_: BigNumberish,
    semaphoreVerifier_: string,
    signer_: string,
    sourceStateContract_: string,
    chainName_: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  __Signers_init(
    signer_: string,
    facade_: string,
    chainName_: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  chainName(overrides?: CallOverrides): Promise<string>;

  checkSignatureAndIncrementNonce(
    methodId_: BigNumberish,
    contractAddress_: string,
    signHash_: BytesLike,
    signature_: BytesLike,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  facade(overrides?: CallOverrides): Promise<string>;

  getRootInfo(
    root_: BigNumberish,
    overrides?: CallOverrides
  ): Promise<IIdentityManager.RootInfoStructOutput>;

  getSigComponents(
    methodId_: BigNumberish,
    contractAddress_: string,
    overrides?: CallOverrides
  ): Promise<[string, BigNumber] & { chainName_: string; nonce_: BigNumber }>;

  getTreeDepth(overrides?: CallOverrides): Promise<number>;

  isLatestRoot(root: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

  isValidRoot(root: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

  latestRoot(overrides?: CallOverrides): Promise<BigNumber>;

  nonces(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  rootExists(root_: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

  rootHistory(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  rootHistoryExpiry(overrides?: CallOverrides): Promise<BigNumber>;

  setRootHistoryExpiry(
    expiryTime_: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  signedTransitRoot(
    prevRoot_: BigNumberish,
    postRoot_: BigNumberish,
    replacedAt_: BigNumberish,
    proof_: BytesLike,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  sourceStateContract(overrides?: CallOverrides): Promise<string>;

  validateChangeAddressSignature(
    methodId_: BigNumberish,
    contractAddress_: string,
    newAddress_: string,
    signature_: BytesLike,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  verifyProof(
    root: BigNumberish,
    signalHash: BigNumberish,
    nullifierHash: BigNumberish,
    externalNullifierHash: BigNumberish,
    proof: BigNumberish[],
    overrides?: CallOverrides
  ): Promise<void>;

  callStatic: {
    P(overrides?: CallOverrides): Promise<BigNumber>;

    __IdentityManager_init(
      treeDepth_: BigNumberish,
      semaphoreVerifier_: string,
      signer_: string,
      sourceStateContract_: string,
      chainName_: string,
      overrides?: CallOverrides
    ): Promise<void>;

    __Signers_init(
      signer_: string,
      facade_: string,
      chainName_: string,
      overrides?: CallOverrides
    ): Promise<void>;

    chainName(overrides?: CallOverrides): Promise<string>;

    checkSignatureAndIncrementNonce(
      methodId_: BigNumberish,
      contractAddress_: string,
      signHash_: BytesLike,
      signature_: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    facade(overrides?: CallOverrides): Promise<string>;

    getRootInfo(
      root_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<IIdentityManager.RootInfoStructOutput>;

    getSigComponents(
      methodId_: BigNumberish,
      contractAddress_: string,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { chainName_: string; nonce_: BigNumber }>;

    getTreeDepth(overrides?: CallOverrides): Promise<number>;

    isLatestRoot(
      root: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isValidRoot(
      root: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    latestRoot(overrides?: CallOverrides): Promise<BigNumber>;

    nonces(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rootExists(
      root_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    rootHistory(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rootHistoryExpiry(overrides?: CallOverrides): Promise<BigNumber>;

    setRootHistoryExpiry(
      expiryTime_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    signedTransitRoot(
      prevRoot_: BigNumberish,
      postRoot_: BigNumberish,
      replacedAt_: BigNumberish,
      proof_: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    signer(overrides?: CallOverrides): Promise<string>;

    sourceStateContract(overrides?: CallOverrides): Promise<string>;

    validateChangeAddressSignature(
      methodId_: BigNumberish,
      contractAddress_: string,
      newAddress_: string,
      signature_: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    verifyProof(
      root: BigNumberish,
      signalHash: BigNumberish,
      nullifierHash: BigNumberish,
      externalNullifierHash: BigNumberish,
      proof: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Initialized(uint64)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "RootAdded(uint256,uint128)"(
      root?: null,
      timestamp?: null
    ): RootAddedEventFilter;
    RootAdded(root?: null, timestamp?: null): RootAddedEventFilter;

    "RootHistoryExpirySet(uint256)"(
      newExpiry?: null
    ): RootHistoryExpirySetEventFilter;
    RootHistoryExpirySet(newExpiry?: null): RootHistoryExpirySetEventFilter;

    "SignedRootTransited(uint256,uint256,uint256,uint256)"(
      prevRoot?: null,
      postRoot?: null,
      replacedAt?: null,
      latestRoot?: null
    ): SignedRootTransitedEventFilter;
    SignedRootTransited(
      prevRoot?: null,
      postRoot?: null,
      replacedAt?: null,
      latestRoot?: null
    ): SignedRootTransitedEventFilter;
  };

  estimateGas: {
    P(overrides?: CallOverrides): Promise<BigNumber>;

    __IdentityManager_init(
      treeDepth_: BigNumberish,
      semaphoreVerifier_: string,
      signer_: string,
      sourceStateContract_: string,
      chainName_: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    __Signers_init(
      signer_: string,
      facade_: string,
      chainName_: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    chainName(overrides?: CallOverrides): Promise<BigNumber>;

    checkSignatureAndIncrementNonce(
      methodId_: BigNumberish,
      contractAddress_: string,
      signHash_: BytesLike,
      signature_: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    facade(overrides?: CallOverrides): Promise<BigNumber>;

    getRootInfo(
      root_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSigComponents(
      methodId_: BigNumberish,
      contractAddress_: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTreeDepth(overrides?: CallOverrides): Promise<BigNumber>;

    isLatestRoot(
      root: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isValidRoot(
      root: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    latestRoot(overrides?: CallOverrides): Promise<BigNumber>;

    nonces(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rootExists(
      root_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rootHistory(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rootHistoryExpiry(overrides?: CallOverrides): Promise<BigNumber>;

    setRootHistoryExpiry(
      expiryTime_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    signedTransitRoot(
      prevRoot_: BigNumberish,
      postRoot_: BigNumberish,
      replacedAt_: BigNumberish,
      proof_: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    signer(overrides?: CallOverrides): Promise<BigNumber>;

    sourceStateContract(overrides?: CallOverrides): Promise<BigNumber>;

    validateChangeAddressSignature(
      methodId_: BigNumberish,
      contractAddress_: string,
      newAddress_: string,
      signature_: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    verifyProof(
      root: BigNumberish,
      signalHash: BigNumberish,
      nullifierHash: BigNumberish,
      externalNullifierHash: BigNumberish,
      proof: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    P(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    __IdentityManager_init(
      treeDepth_: BigNumberish,
      semaphoreVerifier_: string,
      signer_: string,
      sourceStateContract_: string,
      chainName_: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    __Signers_init(
      signer_: string,
      facade_: string,
      chainName_: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    chainName(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    checkSignatureAndIncrementNonce(
      methodId_: BigNumberish,
      contractAddress_: string,
      signHash_: BytesLike,
      signature_: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    facade(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getRootInfo(
      root_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSigComponents(
      methodId_: BigNumberish,
      contractAddress_: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTreeDepth(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isLatestRoot(
      root: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isValidRoot(
      root: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    latestRoot(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nonces(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rootExists(
      root_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rootHistory(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rootHistoryExpiry(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setRootHistoryExpiry(
      expiryTime_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    signedTransitRoot(
      prevRoot_: BigNumberish,
      postRoot_: BigNumberish,
      replacedAt_: BigNumberish,
      proof_: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    signer(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    sourceStateContract(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    validateChangeAddressSignature(
      methodId_: BigNumberish,
      contractAddress_: string,
      newAddress_: string,
      signature_: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    verifyProof(
      root: BigNumberish,
      signalHash: BigNumberish,
      nullifierHash: BigNumberish,
      externalNullifierHash: BigNumberish,
      proof: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
