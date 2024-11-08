import { chain } from "@/chain";
import { client } from "@/client";
import { getContract } from "thirdweb";
import { mandaLinkAbi } from "./abis/mandaLinkAbi";
import { PaymentContractAbi } from "./abis/PaymentContractAbi";
import { usdtAbi } from "./abis/usdtAbi";

const USDTAddress = "0x1103E49738e45A5D4A91cB78769688A66948A179"
export const MandaLinkAddress = "0x2061B1745bA2065019b64Fa1e73BBc46301bfF6c"
export const PaymentAddress = "0x8b3D5c9E69f7E2469faAa264aD06119e416a5FDf"


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
