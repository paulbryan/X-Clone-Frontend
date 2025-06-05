
import { FaHouse } from "react-icons/fa6";
import { FaSearch, FaRegBell } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import ComposePostMobileButton from "./ButtonComponent/ComposePostMobileButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "./Context/CurrentUserProvider";



function FooterBar () {

    const navigate = useNavigate();
    const {currentUser, unreadNotifications} = useCurrentUser();
 
    return (

        <>
            <div className="h-14 w-full bg-(--background-main) absolute bottom-0 text-2xl text-white border-t border-t-(--twitter-border) flex items-center justify-around">

                <div className="w-full h-full flex items-center justify-center">
                    <FaHouse className="hover:cursor-pointer" onClick={() => navigate("/")}/>
                </div>
                <div className="w-full h-full flex items-center justify-center">
                    <FaSearch />
                </div>
                <div className="w-full h-full flex relative items-center justify-center">
                    <FaRegBell onClick={() => {
                        if (currentUser) {
                            navigate("/notifications")
                        }
                    }} />
                    {currentUser && unreadNotifications.length > 0 && (
                        <div className="w-4 rounded-full h-4 absolute z-40 bg-(--color-main) top-2 right-9">  </div>
                    )}
                </div>
                <div className="w-full h-full flex items-center justify-center">
                    <FiMail />
                </div>

                {currentUser && (
                <ComposePostMobileButton/>
                )}
            </div>

            
        </>

    )

}

export default FooterBar;