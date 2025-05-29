import { useCurrentUser } from "../Context/CurrentUserProvider";
import UsernameComponent from "../UserInfo/UsernameComponent";
import PostInteractionComponent from "./PostInteractionComponent";
import ProfilePic from "./ProfilePic";

function PostTemplate () {

    const {currentUser} = useCurrentUser();

    return (

        <>
            <div className="h-fit w-full flex border-b-2 border-t-2 border-(--twitter-border)">

            <div className="flex w-full h-fitl px-4 pt-3">
                <div className="flex w-12 mr-2">
                    <div className="w-10 h-10">
                        <ProfilePic user={currentUser}/>
                    </div>
                </div>

                <div className="pb-3 w-full h-fit">
                    <div className="w-full h-fit flex-col">
                        <div className="w-full h-5 flex gap-2 align-middle text-white mb-0.5">
                                <p className="font-bold">Jokerhut</p>
                                <div className="text-(--twitter-text)">
                                    <UsernameComponent user={currentUser}/>
                                </div>
                                <p>·</p>
                                <p>Feb 5</p>
                        </div>
                        <div className="text-white max-h-32">
                            <p>
                            Project almost finished, if all goes well should be done by the weekend!⏱️✅ I added different background and color themes, and now i'm doing the CSS for mobile screens.
                            </p>
                        </div>
                        <div>
                            <PostInteractionComponent/>
                        </div>
                    </div>

                </div>

            </div>

            </div>
        </>

    )

}

export default PostTemplate;