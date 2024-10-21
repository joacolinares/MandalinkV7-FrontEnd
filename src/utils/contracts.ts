import { chain } from "@/chain";
import { client } from "@/client";
import { getContract } from "thirdweb";
import { mandaLinkAbi } from "./abis/mandaLinkAbi";
import { PaymentContractAbi } from "./abis/PaymentContractAbi";
import { usdtAbi } from "./abis/usdtAbi";

const USDTAddress = "0x31B4245d9f88DA6Fa01A14398adA46b177c7F2ba"
export const MandaLinkAddress = "0xC8570a8952617D49ebc6765756407b076A38a122"
export const PaymentAddress = "0xc7c2DBB56dA108dCD5B8f49BDd65e9962C8467eB"


export const USDTContract = getContract({
    client: client,
    address: USDTAddress,
    chain: chain,
    abi: usdtAbi
})
export const USDTContract2 = getContract({
    client: client,
    address: USDTAddress,
    chain: chain,
})
export const MandaLinkContract = getContract({
    client: client,
    address: MandaLinkAddress,
    chain: chain,
  //  abi: mandaLinkAbi
})
export const MandaLinkContract2 = getContract({
    client: client,
    address: MandaLinkAddress,
    chain: chain,
    abi: mandaLinkAbi
})
export const PaymentContract = getContract({
    client: client,
    address: PaymentAddress,
    chain: chain
})
export const PaymentContract2 = getContract({
    client: client,
    address: PaymentAddress,
    chain: chain,
    abi: PaymentContractAbi
})
