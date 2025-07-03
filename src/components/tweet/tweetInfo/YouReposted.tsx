import { BsPin } from "react-icons/bs";

type YouRepostedProps = {
    reposterId?: number;
}

export function YouReposted ({} : YouRepostedProps) {
    return (
    <>
        <div className="flex h-6 col-start-2 items-center gap-2 text-twitterTextAlt w-full">
        <BsPin className="text-md"/>
        <p className="text-sm">Pinned</p>
        </div>
    </>    
    )
}