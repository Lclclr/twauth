import { cookies } from "next/headers";
import { thirdwebAuth } from "../utils/thirdwebAuth";
import { add } from "thirdweb/extensions/thirdweb";
import { hasAccess } from "../actions/conditions";
import Link from "next/link";
import { GatedContent } from "./GatedContent";


export default async function GatedPage() {
    const jwt = (await cookies()).get('jwt');

    if(!jwt?.value){
        return <MustLogin/>
    }

    const authResult = await thirdwebAuth.verifyJWT({
        jwt: jwt.value,
    });

    if(!authResult.valid){
        return <MustLogin/>
    }

    const address = authResult.parsedJWT.sub;
    if (!address) {
        throw new Error("No address found");
    }

    const _hasAccess = await hasAccess(address);

    if (!_hasAccess) {
        return <NotAllowed/>;
    }   

    return <GatedPage />;
}

const MustLogin = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[100vh] p-4 text-center">
            <p>You are not logged in.</p>
            <Link href="/">
                <button className="px-4 py-2 mt-4 text-black bg-zinc-100 rounded-md ">Go to login</button>
            </Link>
        </div>
    )
};

const NotAllowed = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[100vh] p-4 text-center">
            <p>You do not own the access NFT.</p>
            <Link href="/">
                <button className="px-4 py-2 mt-4 text-black bg-zinc-100 rounded-md ">Go to login</button>
            </Link>
            <Link href="/claim-nft">
                <button className="px-4 py-2 mt-4 text-black bg-zinc-100 rounded-md ">Claim NFT</button>
            </Link>
        </div>
    )
}