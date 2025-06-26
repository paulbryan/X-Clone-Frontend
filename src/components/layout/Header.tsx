import { FaXTwitter } from "react-icons/fa6";
import ProfilePic from "../user/ProfilePic.tsx";
import { FaArrowLeft } from "react-icons/fa";

import { useModal } from "../../context/GlobalState/ModalProvider.tsx";
import { useContext, useEffect, useState } from "react";
import MobileMainDrawer from "../modal/drawer/MobileMainDrawer.tsx";
import { useCurrentUser } from "../../context/Auth/CurrentUserProvider.tsx";
import { useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { HeaderContentContext } from "../../context/GlobalState/HeaderContentProvider.tsx";


function Header () {

    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const {currentUser} = useCurrentUser();
    const { setModalType } = useModal();
    const navigate = useNavigate();
    const location = useLocation();
    const {headerContent} = useContext(HeaderContentContext);

    const isHome = location.pathname === "/";

    return (

        <>
            <div className={`h-16 ${!isHome ? 'border-b border-twitterBorder' : ''} w-full relative flex justify-between bg-(--background-main) px-3 text-white`}>

                <div className="h-full w-full flex relative items-center justify-start">
                    {currentUser && isHome ? (
                    <div
                    onClick={() => setDrawerOpen(true)}
                    className="w-10 h-10 flex justify-center items-center">
                        <ProfilePic disableNavigation={true} userId={currentUser.id}/>
                    </div>
                    ) : !isHome && (

                        <div 
                        className="w-12 h-12 flex items-center justify-center text-xl"
                        onClick={() => navigate(-1)}>
                        <FaArrowLeft />
                        </div>
                    )}
                    {headerContent && (
                        <div className="text-xl font-semibold pl-2 flex items-center h-full ">
                        {headerContent}
                        </div>
                    )}
                </div>

                {!headerContent ? (
                <>
                <div className="h-full w-full flex relative items-center justify-center text-xl font-bold">
                    <FaXTwitter onClick={() => navigate("/")} className="text-2xl"/>          
                </div>
                <div className="h-full w-full flex relative items-center justify-end">
                </div>
                </>
                ) : (
                    null
                )}



            </div>

            {!currentUser && (
                    <>
                    <div 
                    className="flex p-3 gap-4 h-14 font-bold justify-center items-center w-full">

                    <div className="p-1 rounded-2xl border-twitterTextAlt flex items-center justify-center w-full border" onClick={() => setModalType("signup")}
                    >
                        <p>Register</p>
                     </div>   
                     <div className="p-1 rounded-2xl text-twitterText flex items-center justify-center w-full bg-(--color-main)" onClick={() => setModalType("login")}
                    >
                        <p>Log in</p>
                     </div>  
                    </div>
                    </>
                    )}


            <AnimatePresence>
            {drawerOpen && (
                <MobileMainDrawer setDrawerOpen={setDrawerOpen} />
            )}
            </AnimatePresence>


        </>

    )

}

export default Header;