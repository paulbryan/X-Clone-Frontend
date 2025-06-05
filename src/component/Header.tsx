import { FaXTwitter } from "react-icons/fa6";
import ProfilePic from "./UIComponent/ProfilePic";
import { FaArrowLeft } from "react-icons/fa";

import { useModal } from "./Context/ModalProvider";
import { useState } from "react";
import MobileMainDrawer from "./Drawer/MobileMainDrawer";
import { useCurrentUser } from "./Context/CurrentUserProvider";
import { useNavigate, useLocation } from "react-router-dom";
import HomePage from "./ScreenPages/HomePage";


function Header () {

    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const {currentUser} = useCurrentUser();
    const { setModalType } = useModal();
    const navigate = useNavigate();
    const location = useLocation();

    const isHome = location.pathname === "/";

    return (

        <>
            <div className={`h-16 ${!isHome ? 'border-b border-(--twitter-border)' : ''} w-full relative flex justify-between bg-(--background-main) px-3 text-white`}>

                <div className="h-full w-full flex relative items-center justify-start">
                    {currentUser && isHome ? (
                    <div
                    onClick={() => setDrawerOpen(true)}
                    className="w-12 h-12 flex justify-center items-center">
                        <ProfilePic user={currentUser}/>
                    </div>
                    ) : !isHome && (
                        <div 
                        className="w-12 h-12 flex items-center justify-center text-xl"
                        onClick={() => navigate(-1)}>
                        <FaArrowLeft />
                        </div>
                    )}
                </div>

                <div className="h-full w-full flex relative items-center justify-center">
                    <FaXTwitter onClick={() => navigate("/")} className="text-2xl"/>
                </div>

                <div className="h-full w-full flex relative items-center justify-end">
                </div>

            </div>

            {!currentUser && (
                    <>
                    <div 
                    className="flex p-3 gap-4 h-14 font-bold justify-center items-center w-full">

                    <div className="p-1 rounded-2xl border-(--twitter-text) flex items-center justify-center w-full border" onClick={() => setModalType("signup")}
                    >
                        <p>Register</p>
                     </div>   
                     <div className="p-1 rounded-2xl text-(--text-main) flex items-center justify-center w-full bg-(--color-main)" onClick={() => setModalType("login")}
                    >
                        <p>Log in</p>
                     </div>  
                    </div>
                    </>
                    )}

            {drawerOpen ? (
                <MobileMainDrawer setDrawerOpen={setDrawerOpen}/>
            ) : (
                null
            )}


        </>

    )

}

export default Header;