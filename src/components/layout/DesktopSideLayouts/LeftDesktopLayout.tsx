import { useCurrentUser } from "../../../context/Auth/CurrentUserProvider";
import SignupView from "../../entry/SignupView";
import { TermsAndConditions } from "../../entry/TermsAndConditions";
import { UseTempAccountButton } from "../../entry/UseTempAccountButton";
import { GoogleAuthButton } from "../../ui/GoogleAuthButton";
import { HorizontalStripedText } from "../../ui/HorizontalStripedText";
import { AsideContainer } from "./AsideContainer";

export function LeftDesktopLayout () {

    const { currentUser } = useCurrentUser();


    return (
        <div className="hidden md:pr-20 md:flex md:flex-col md:items-end py-3 md:w-2/3 bg-(--background-main)">

        {!currentUser && (
            <AsideContainer>
                <p className="text-xl font-bold">New to X?</p>
                <p className="text-twitterTextAlt text-xs">Sign up now to get your own personalized timeline!</p>


                <div className="w-full flex flex-col gap-4 pt-4">
                    <GoogleAuthButton>
                        Sign up with Google
                    </GoogleAuthButton>
                    <HorizontalStripedText>
                        OR
                    </HorizontalStripedText>
                    <UseTempAccountButton invertColor={true}/>
                    <TermsAndConditions/>
                </div>
            </AsideContainer>
        )}

        </div>
    )

}