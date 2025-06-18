import { HeroIcon } from "../../types/HeroIcon";

type YouRepostedProps = {
    reposterId?: number;
}

export function YouReposted ({reposterId} : YouRepostedProps) {
    return (
    <>
        <div className="flex h-6 my-2 col-start-2 items-center gap-2 text-(--twitter-text) w-full">
        <HeroIcon iconName="ArrowPathRoundedSquareIcon"/>
        <p>You reposted</p>
        </div>
    </>    
    )
}