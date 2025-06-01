
import { FaHouse } from "react-icons/fa6";
import { FaSearch, FaRegBell } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import ComposePostMobileButton from "./ButtonComponent/ComposePostMobileButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



function FooterBar () {

    const navigate = useNavigate();

    return (

        <>
            <div className="h-14 w-full bg-(--background-main) absolute bottom-0 text-2xl text-white border-t border-t-(--twitter-border) flex items-center justify-around">

                <div className="w-full h-full flex items-center justify-center">
                    <FaHouse className="hover:cursor-pointer" onClick={() => navigate("/")}/>
                </div>
                <div className="w-full h-full flex items-center justify-center">
                    <FaSearch />
                </div>
                <div className="w-full h-full flex items-center justify-center">
                    <FaRegBell />
                </div>
                <div className="w-full h-full flex items-center justify-center">
                    <FiMail />
                </div>

                <ComposePostMobileButton/>

            </div>

            
        </>

    )

}

export default FooterBar;