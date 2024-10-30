import { chain } from "@/chain";
import { client } from "@/client";
import { getContract } from "thirdweb";
import { mandaLinkAbi } from "./abis/mandaLinkAbi";
import { PaymentContractAbi } from "./abis/PaymentContractAbi";
import { usdtAbi } from "./abis/usdtAbi";

const USDTAddress = "0x1103E49738e45A5D4A91cB78769688A66948A179"
export const MandaLinkAddress = "0x5E0F98Ec31b25e7Ab3b3f8FaEEC190A0CD4e3F2C"
export const PaymentAddress = "0x374c17f6Ac72391FFf4E71B0899aE5A010411bD4"


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
    abi: mandaLinkAbi
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
