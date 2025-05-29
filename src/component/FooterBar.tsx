
import { FaHouse } from "react-icons/fa6";
import { FaSearch, FaRegBell } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import ComposePostMobileButton from "./ButtonComponent/ComposePostMobileButton";
import { useState } from "react";



function FooterBar () {

    return (

        <>
            <div className="h-14 w-full text-2xl text-white border-t border-t-(--twitter-border) flex items-center justify-around">

                <div className="w-full h-full flex items-center justify-center">
                    <FaHouse/>
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