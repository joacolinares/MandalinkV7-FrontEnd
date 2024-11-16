import { chain } from "@/chain";
import { client } from "@/client";
import { getContract } from "thirdweb";
import { mandaLinkAbi } from "./abis/mandaLinkAbi";
import { PaymentContractAbi } from "./abis/PaymentContractAbi";
import { usdtAbi } from "./abis/usdtAbi";

const USDTAddress = "0x1103E49738e45A5D4A91cB78769688A66948A179"
export const MandaLinkAddress = "0x84BF29F7A1772398Ada3c0b3511d9990A9c6197d"
export const PaymentAddress = "0xB41a53e07ee8aceC2E4Cb7AC47bB43E6982c0eb4"


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
