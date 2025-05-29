import { FaXTwitter } from "react-icons/fa6";
import ProfilePic from "./UIComponent/ProfilePic";

import { useModal } from "./Context/ModalProvider";


function Header () {

    const { setModalType } = useModal();

    return (

        <>
            <div className="h-14 w-full flex justify-between px-3 text-white">

                <div className="h-full w-full flex relative items-center justify-start">
                    <div className="w-12 h-12">
                        <ProfilePic/>
                    </div>
                </div>

                <div className="h-full w-full flex relative items-center justify-center">
                    <FaXTwitter className="text-2xl"/>
                </div>

                <div className="h-full w-full flex relative items-center justify-end">
                    <div 
                    className="flex p-0.5 font-semibold justify-center items-center w-20 rounded-2xl border-(--color-main) border"
                    onClick={() => setModalType("signup")}
                    >
                        <p>Sign up</p>
                    </div>
                </div>

            </div>


        </>

    )

}

export default Header;