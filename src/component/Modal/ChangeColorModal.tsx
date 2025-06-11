import { useNavigate } from "react-router-dom";
import type { ModalType } from "../../types/ModalType";
import FullPost from "../Tweet/FullPost";
import ProfilePic from "../UserInfo/ProfilePic";
import { useCurrentUser } from "../../context/currentUser/CurrentUserProvider";
import DisplayNameComponent from "../UserInfo/DisplayNameComponent";
import UsernameComponent from "../UserInfo/UsernameComponent";
import CreatedAtDisplay from "../UIComponent/CreatedAtDisplay";
import ColorCircleButton from "../ButtonComponent/ColorCircleButton";
import { useState } from "react";
import type { ThemeType } from "../../types/ThemeType";
import type { BackgroundType } from "../../types/BackgroundType";
import BackgroundSetterButton from "../ButtonComponent/BackgroundSetterButton";

type ChangeColorModalProps = {
    setToggle: (modalType: ModalType) => void;
}

function ChangeColorModal ({setToggle}: ChangeColorModalProps) {

    const navigate = useNavigate();
    const {currentUser} = useCurrentUser()

    const [currentTheme, setCurrentTheme] = useState<ThemeType>(getComputedStyle(document.documentElement).getPropertyValue("--color-main").trim() as ThemeType);
    const [currentBackGround, setCurrentBackground] = useState<BackgroundType>(getComputedStyle(document.documentElement).getPropertyValue("--background-main").trim() as BackgroundType);

    function setBackground (bgType : BackgroundType) {
    document.documentElement.style.setProperty(
        "--background-main",
        bgType
      );
      setCurrentBackground(bgType);

    }

    function setTheme (thType : ThemeType) {
    document.documentElement.style.setProperty(
        "--color-main",
        thType
      );
      
      setCurrentTheme(thType);

    }
    

    return (

        <div className="w-full h-full flex flex-col border-(--color-main) border text-(--text-main) rounded-2xl p-4 items-center gap-4 bg-(--background-main)">
        
            <div className="text-xl font-bold">
                <h1>Customize your view</h1>
            </div>
            <div className="text-(--twitter-text) text-center">
                <p>These settings affect all the Twitter accounts on this browser</p>
            </div>

            <div className="h-fit w-full rounded-2xl border border-(--twitter-border)">
                <div className={`grid px-4 py-3 grid-cols-[auto_1fr] border-(--twitter-border) gap-x-3 w-full`}>            {/* LEFT COLUMN: Profile Pic */}

                <div className="relative w-12 flex justify-center">
                    <div
                        className="h-12 w-12 cursor-pointer"
                        onClick={() => navigate(`/profile/13`)}
                    >
                        <ProfilePic user={currentUser} />
                    </div>
                </div>
                <div className={`flex "mb-0.5 gap-2 items-center text-(--text-main) `}>
                        <div className="font-bold">
                        <DisplayNameComponent user={currentUser}/>
                        </div>
                    <div className="text-(--twitter-text) text-md">
                        <UsernameComponent user={currentUser} />
                    </div>
                </div> 
                <div>

                </div>
                <div className={`text-(--text-main) whitespace-pre-line break-words mb-2`}>
                    <p>At the heart of Twitter are short messages called Tweets — just like this one — which can include photos, videos, links, text, hashtags, and mentions like <span className="text-(--color-main)">@twitter</span></p>
                </div>
                </div>


            </div>


            <div className="w-full flex flex-col gap-1">
                <p className="text-(--twitter-text) font-bold">Color</p>    
                <div className="w-full flex items-center justify-around h-20 bg-(--twitter-border)/40 rounded-2xl">
                <ColorCircleButton color="var(--twitter-blue)" currentColor={currentTheme} setCurrentTheme={setTheme}/>

                <ColorCircleButton color="var(--twitter-red)" currentColor={currentTheme} setCurrentTheme={setTheme}/>

                <ColorCircleButton color="var(--twitter-yellow)" currentColor={currentTheme} setCurrentTheme={setTheme}/>

                <ColorCircleButton color="var(--twitter-purple)" currentColor={currentTheme} setCurrentTheme={setTheme}/>
                </div>
            </div>

            <div className="w-full flex flex-col gap-1">
                <p className="text-(--twitter-text) font-bold">Color</p>    
                <div className="w-full flex gap-4 px-4 items-center justify-center h-16 bg-(--twitter-border)/20 rounded-2xl">
                <BackgroundSetterButton color="var(--twitter-black)" currentColor={currentBackGround} setCurrentBackground={setBackground} />
                <BackgroundSetterButton color="var(--dim-background)" currentColor={currentBackGround} setCurrentBackground={setBackground} />
                </div>
            </div>


        </div>

    )


}

export default ChangeColorModal;