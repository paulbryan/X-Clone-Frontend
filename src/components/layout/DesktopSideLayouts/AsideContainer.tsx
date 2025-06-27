import type { ReactNode } from "react";

type AsideContainerProps = {
    children: ReactNode;
}

export function AsideContainer ({children}: AsideContainerProps) {

    return (
        <div className="w-5/6 border text-twitterText flex flex-col p-4 border-twitterBorder rounded-xl">
            {children}
        </div>
    )

}