import { chain } from "@/chain";
import { client } from "@/client";
import { getContract } from "thirdweb";

export const MandaLinkAddress = "0x63a938a256a743EB545536B1C63C24Cfd239C88d"

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