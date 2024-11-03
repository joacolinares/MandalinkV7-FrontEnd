import { chain } from "@/chain";
import { client } from "@/client";
import { getContract } from "thirdweb";
import { mandaLinkAbi } from "./abis/mandaLinkAbi";
import { PaymentContractAbi } from "./abis/PaymentContractAbi";
import { usdtAbi } from "./abis/usdtAbi";

const USDTAddress = "0x1103E49738e45A5D4A91cB78769688A66948A179"
export const MandaLinkAddress = "0x675b07D325086b088d683C49529DD01088f9b1DF"
export const PaymentAddress = "0x4513F75Df30B38fdF0e6a8313c58E7D926543507"


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
