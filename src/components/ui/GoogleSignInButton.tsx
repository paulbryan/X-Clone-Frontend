import type { ReactNode } from "react";
import { FaGoogle } from "react-icons/fa6";


type GoogleSignInButtonProps = {
    children: ReactNode;
}

export function GoogleSignInButton ({children}: GoogleSignInButtonProps) {

    return (
    <div className="w-full bg-twitterText text-twitterBlack flex items-center gap-2 justify-center h-10 rounded-full">
        <FaGoogle />
        <p className="">{children}</p>
      </div>
    )

}