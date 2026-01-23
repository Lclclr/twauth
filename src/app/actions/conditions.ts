import { defineChain, getContract } from "thirdweb";
import { balanceOf } from "thirdweb/extensions/erc721";
import { client } from "../client";

export async function hasAccess(
    address: string,
): Promise<boolean> {
    const quantityRequired = 1n;

    const contract = getContract({
        client: client,
        chain: defineChain(8453), //defineChain();base
        address: ""
    });

    const ownedBalance = await balanceOf({
        contract: contract,
        owner: address,
    });

    return ownedBalance >= quantityRequired;
}