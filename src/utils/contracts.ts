import { chain } from "@/chain";
import { client } from "@/client";
import { getContract } from "thirdweb";
import { mandaLinkAbi } from "./abis/mandaLinkAbi";
const USDTAddress = "0x31B4245d9f88DA6Fa01A14398adA46b177c7F2ba"
export const MandaLinkAddress = "0x47484F995e640d99D8eF0BaE2eE8f8Fe309C8142"
export const PaymentAddress = "0xF77D4dCe4Ec15f2FfCd8fF2915054566123d1F9D"


export const USDTContract = getContract({
    client: client,
    address: USDTAddress,
    chain: chain
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
