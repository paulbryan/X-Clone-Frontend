import ProfilePic from "../UserInfo/ProfilePic";
import TextareaAutosize from 'react-textarea-autosize';
import { FaRegImage } from "react-icons/fa";
import { MdOutlineGif } from "react-icons/md";
import UploadTweetButton from "../ButtonComponent/UploadTweetButton";
import { useCurrentUser } from "../../context/currentUser/CurrentUserProvider";
import { useState } from "react";
import type { NewPost } from "../../types/NewPost";
import { usePostCache } from "../../context/cache/PostCacheProvider";
import type { Post } from "../../types/Post";

type ComposeTweetProps = {
    parentId?: number;
    parentUsername?: string;
}

//TODO maybe add upper tweet

function ComposeTweet ({parentId, parentUsername}: ComposeTweetProps) {

    const [textInput, setTextInput] = useState<string>("");
    const {currentUser} = useCurrentUser();

    return (
        <div className="flex flex-col pt-4 pb-4 w-full border-b border-gray-700">
        <div className="grid px-4 grid-cols-[auto_1fr] gap-x-3 w-full">
            
            {parentId && (
            <>
            <div>

            </div>

            <div className="w-full">
                <p className="text-(--twitter-text)">Replying to <span className="text-(--color-main)">@{parentUsername}</span></p>
            </div>
            </>
            )}

            <div className="w-12 h-12 cursor-pointer">
                <ProfilePic user={currentUser}/>
            </div>
            <div className="flex flex-col w-full h-fit">
                <div className="w-full h-fit flex">
                    <TextareaAutosize value={textInput} onChange={(e) => setTextInput(e.target.value)} className="w-full min-h-12 p-1 text-white placeholder:text-(--twitter-text)"
                    placeholder="Tweet your reply"
                    />
                </div>
                <div className="flex w-full h-10 items-center">
                    <div className="flex gap-2 pl-2 items-center text-(--color-main) h-full w-full">
                        <FaRegImage />
                        <MdOutlineGif className="text-4xl"/>
                    </div>
                    <div className="w-full h-full justify-end flex items-center">
                        <UploadTweetButton textInput = {textInput} parentId={parentId}/>
                    </div>
                </div>
            </div>

        </div>
    </div>
    )

}

export default ComposeTweet;