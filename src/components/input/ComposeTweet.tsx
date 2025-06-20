import ProfilePic from "../user/ProfilePic.tsx";
import TextareaAutosize from 'react-textarea-autosize';
import { MdOutlineGif } from "react-icons/md";
import UploadTweetButton from "../ui/UploadTweetButton.tsx";
import { useCurrentUser } from "../../context/Auth/CurrentUserProvider.tsx";
import { useState } from "react";
import type { ModalType } from "../../lib/types/ModalType.ts";
import FullPostTemplate from "../tweet/FullPostTemplate.tsx";
import { ImageUploadButton } from "../ui/ImageUploadButton.tsx";
import { ImageGrid } from "../layout/media/ImageGrid.tsx";
import type { FilesWithId } from "../../lib/types/file.ts";

type ComposeTweetProps = {
    parentId?: number;
    setToggle?: (modalType: ModalType) => void;
    showParentPreview?: boolean;
}

function ComposeTweet ({parentId, setToggle, showParentPreview}: ComposeTweetProps) {

    const [textInput, setTextInput] = useState<string>("");
    const {currentUser} = useCurrentUser();
    const [imagesInput, setImagesInput] = useState<FilesWithId>([]);
    const isModal = setToggle != null;
    const placeHolder = parentId ? "Tweet your reply" : "What's up?!"

    return (
        <div className={`flex flex-col pt-4 pb-4 bg-(--background-main) w-full ${isModal ? "rounded-2xl border border-(--color-main)" : "border-b border-gray-700"}`}>
        
        {showParentPreview && parentId && (
            <FullPostTemplate postId={parentId} modalReplyChild={true} showLine={true}/>
        )}

        <div className={`grid px-4 grid-cols-[auto_1fr] gap-x-3 w-full ${parentId && showParentPreview ? "py-2" : ""}`}>
            <div className="w-12 h-12 cursor-pointer">
                <ProfilePic userId={currentUser?.id}/>
            </div>
            <div className="flex flex-col w-full h-fit">
                <div className="w-full h-fit flex">
                    <TextareaAutosize value={textInput} onChange={(e) => setTextInput(e.target.value)} className="w-full min-h-12 p-1 text-white placeholder:text-twitterTextAlt"
                    placeholder={placeHolder}
                    />
                </div>
                {imagesInput.length > 0 && (
                <div className="w-full h-fit">
                    <ImageGrid images={imagesInput} setImages={setImagesInput}/>
                </div>
                )}
                <div className="flex w-full h-10 items-center">
                    <div className="flex gap-2 pl-2 items-center text-(--color-main) h-full w-full">
                        <ImageUploadButton imagesInput={imagesInput} setImagesInput={setImagesInput}/>
                        <MdOutlineGif className="text-4xl"/>
                    </div>
                    <div className="w-full h-full justify-end flex items-center">
                        <UploadTweetButton filesWithId={imagesInput} setToggle={setToggle} textInput = {textInput} parentId={parentId}/>
                    </div>
                </div>
            </div>

        </div>
    </div>
    )

}

export default ComposeTweet;