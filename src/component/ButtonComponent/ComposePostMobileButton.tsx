import { RiQuillPenLine } from "react-icons/ri";

import { useModal } from "../../context/GlobalState/ModalProvider";

function ComposePostMobileButton () {

    const { setModalType } = useModal();


    return (

        <>
            <div className="absolute h-14 w-14 right-5 bottom-20">
                <div
                 className="bg-(--color-main) flex items-center justify-center text-3xl rounded-full w-full h-full"
                 >
                    <RiQuillPenLine onClick={() => setModalType("posting")}/>
                </div>
            </div>

        </>
    )

}

export default ComposePostMobileButton;