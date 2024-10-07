import { chain } from "@/chain";
import { client } from "@/client";
import { getContract } from "thirdweb";

export const MandaLinkAddress = "0xf10929596f5Ab0153357a1E6428793628D7c4129"

const USDTAddress = "0x31B4245d9f88DA6Fa01A14398adA46b177c7F2ba"

export const MandaLinkContract = getContract({
    client: client,
    address: MandaLinkAddress,
    chain: chain
})

export const USDTContract = getContract({
    client: client,
    address: USDTAddress,
    chain: chain
})