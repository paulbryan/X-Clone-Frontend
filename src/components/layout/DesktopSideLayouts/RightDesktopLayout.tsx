import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../../context/Auth/CurrentUserProvider";
import { useTopFiveUsers } from "../../../lib/hooks/useTopFiveUsers";
import SignupView from "../../entry/SignupView";
import { TermsAndConditions } from "../../entry/TermsAndConditions";
import { UseTempAccountButton } from "../../entry/UseTempAccountButton";
import { GoogleAuthButton } from "../../ui/GoogleAuthButton";
import { HorizontalStripedText } from "../../ui/HorizontalStripedText";
import { UserSearchResult } from "../pages/UserSearchResult";
import { AsideContainer } from "./AsideContainer";

export function RightDesktopLayout () {

    const { currentUser } = useCurrentUser();

    const {data: topUsers} = useTopFiveUsers();

    const navigate = useNavigate();

    return (
        <div className="hidden lg:flex lg:flex-col gap-4 px-10 md:items-start py-3 lg:w-2/3">

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

        {currentUser && (
            <>
            <AsideContainer>
                <p className="text-xl pl-2 font-bold">You might like</p>
                <div className="w-full flex flex-col pt-4">
                    {topUsers?.map((id) => (
                        <UserSearchResult userId={id}/>
                    ))}
                </div>
                <p className="pl-2 text-(--color-main) hover:cursor-pointer" onClick={() => navigate("/explore")}>Show more</p>
            </AsideContainer>

            <AsideContainer disabled={true}>
                <p className="text-xl font-bold">What's Happening?</p>
                <div className="w-full flex flex-col gap-4 pt-4">
                    <div className="w-full flex">
                        <div className="w-full flex flex-col">
                            <p className="text-twitterBorder">Trending in the Netherlands</p>
                            <p className="font-bold">SouthAfricaAwaits</p>
                        </div>
                    </div>
                    <div className="w-full flex">
                        <div className="w-full flex flex-col">
                            <p className="text-twitterBorder">Trending in the Netherlands</p>
                            <p className="font-bold">Mark Rutte</p>
                        </div>
                    </div>
                    <div className="w-full flex">
                        <div className="w-full flex flex-col">
                            <p className="text-twitterBorder">Trending in the Netherlands</p>
                            <p className="font-bold">Bitcoin</p>
                        </div>
                    </div>
                    <div className="w-full flex">
                        <div className="w-full flex flex-col">
                            <p className="text-twitterBorder">Trending in the Netherlands</p>
                            <p className="font-bold">SouthAfricaAwaits</p>
                        </div>
                    </div>
                    <div className="w-full flex">
                        <div className="w-full flex flex-col">
                            <p className="text-twitterBorder">Trending in the Netherlands</p>
                            <p className="font-bold">SouthAfricaAwaits</p>
                        </div>
                    </div>
                </div>
            </AsideContainer>
            </>
        )}

        </div>
    )

}