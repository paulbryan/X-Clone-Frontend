import type { ModalType } from "../../types/ModalType";

type ReplyModalProps = {
    setToggle: (type: ModalType) => void;
}

function ReplyModal ({ setToggle }: ReplyModalProps) {

    return (

        <div className="w-full h-full flex flex-col text-(--text-main) rounded-2xl p-4 items-center gap-4 bg-(--background-main)">
        

        
        </div>

    )

}

export default ReplyModal;