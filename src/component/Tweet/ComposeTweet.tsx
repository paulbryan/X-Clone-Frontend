import ProfilePic from "../UserInfo/ProfilePic";
import TextareaAutosize from 'react-textarea-autosize';
import { FaRegImage } from "react-icons/fa";
import { MdOutlineGif } from "react-icons/md";
import UploadTweetButton from "../ButtonComponent/UploadTweetButton";
import { useCurrentUser } from "../../hooks/CurrentUserProvider";
import { useState } from "react";
import type { NewPost } from "../../types/NewPost";
import { usePostCache } from "../../context/cache/PostCacheProvider";
import type { Post } from "../../types/Post";
import type { ModalType } from "../../types/ModalType";
import { motion } from "framer-motion";
import FullPostTemplate from "./FullPostTemplate";

type ComposeTweetProps = {
    parentId?: number;
    parentUsername?: string;
    setNewPost?: (post: Post) => void;
    setToggle?: (modalType: ModalType) => void;
    showParentPreview?: boolean;
}

//TODO maybe add upper tweet

function ComposeTweet ({parentId, parentUsername, setNewPost, setToggle, showParentPreview}: ComposeTweetProps) {

    const [textInput, setTextInput] = useState<string>("");
    const {currentUser} = useCurrentUser();

    const isModal = setToggle != null;
    const placeHolder = parentId ? "Tweet your reply" : "What's up?!"


const fromBottom = {
    initial: { y: 25, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { type: "spring" } }
  };


    return (
        <div className={`flex flex-col pt-4 pb-4 bg-(--background-main) w-full ${isModal ? "rounded-2xl border border-(--color-main)" : "border-b border-gray-700"}`}>
        
        {showParentPreview && parentId && (
            <FullPostTemplate postId={parentId} modalReplyChild={true} showLine={true}/>
        )}

        <div className={`grid px-4 grid-cols-[auto_1fr] gap-x-3 w-full ${parentId && showParentPreview ? "py-2" : ""}`}>
            <div className="w-12 h-12 cursor-pointer">
                <ProfilePic user={currentUser}/>
            </div>
            <div className="flex flex-col w-full h-fit">
                <div className="w-full h-fit flex">
                    <TextareaAutosize value={textInput} onChange={(e) => setTextInput(e.target.value)} className="w-full min-h-12 p-1 text-white placeholder:text-(--twitter-text)"
                    placeholder={placeHolder}
                    />
                </div>
                <div className="flex w-full h-10 items-center">
                    <div className="flex gap-2 pl-2 items-center text-(--color-main) h-full w-full">
                        <FaRegImage />
                        <MdOutlineGif className="text-4xl"/>
                    </div>
                    <div className="w-full h-full justify-end flex items-center">
                        <UploadTweetButton setToggle={setToggle} textInput = {textInput} parentId={parentId} setNewPost={setNewPost}/>
                    </div>
                </div>
            </div>

        </div>
    </div>
    )

}

export default ComposeTweet;