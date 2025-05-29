import { FaRegComment, FaRegHeart, FaRegBookmark } from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";
import InteractionButton from "./InteractionButton";



function PostInteractionComponent () {

    return (

        <>
            <div className="h-5 mt-3 text-(--twitter-text) w-full flex items-center align-middle justify-between">

                <InteractionButton>
                    <FaRegComment/>
                </InteractionButton>

                <InteractionButton>
                    <FaRepeat/>
                </InteractionButton>

                <InteractionButton>
                    <FaRegHeart/>
                </InteractionButton>

                <InteractionButton>
                    <FaRegBookmark/>
                </InteractionButton>

            </div>
        </>

    )

}

export default PostInteractionComponent;