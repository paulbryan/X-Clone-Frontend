import { FaGoogle } from "react-icons/fa6";

export function GoogleSignInButton () {

    return (
    <div className="w-full bg-twitterText text-twitterBlack flex items-center gap-2 justify-center h-10 rounded-full">
        <FaGoogle />
        <p className="font-bold">Sign up with Google</p>
      </div>
    )

}