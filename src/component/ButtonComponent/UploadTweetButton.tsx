import type { NewPost } from "../../types/NewPost";
import type { Post } from "../../types/Post";
import { useCurrentUser } from "../Context/CurrentUserProvider";
import { useFeedContext } from "../Context/FeedContext";
import { usePostCache } from "../Context/PostCacheProvider";

type UploadTweetButtonProps = {
    textInput: string;
}

function UploadTweetButton ({textInput} : UploadTweetButtonProps) {

    const {currentUser} = useCurrentUser();
    const {addToPostCache} = usePostCache();
    const {addToForYouFeedIds, addToCurrentUserPosts} = useFeedContext();

    function composeNewPost () {

        if (currentUser && textInput.length > 1 && textInput.length < 180) {
            
            const newComposedPost : NewPost = {
                userId: currentUser.id,
                text: textInput
            }

            fetch("http://localhost:8080/api/posts/createPost", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newComposedPost),
              })
              .then(res => res.json())
              .then((data : Post) => {
                addToPostCache(data);
                addToCurrentUserPosts(data.id)
                addToForYouFeedIds(data.id);
              });

        }

    }

    return (

        <div onClick={(() => composeNewPost())} className="w-fit px-4 font-bold text-sm flex items-center justify-center rounded-2xl h-8 bg-(--color-main)">
            <p className="text-white">Tweet</p>
        </div>

    )

}

export default UploadTweetButton;