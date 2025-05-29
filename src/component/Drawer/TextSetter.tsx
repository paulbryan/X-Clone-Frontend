import type { ThemeType } from "../../types/ThemeType";
import type { BackgroundType } from "../../types/BackgroundType";
import { useState } from "react";
import ColorCircleButton from "../ButtonComponent/ColorCircleButton";
import BackgroundSetterButton from "../ButtonComponent/BackgroundSetterButton";


function TextSetter () {

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
        <div className="flex flex-col gap-6 py-2">
            <div className="flex w-full">
                <BackgroundSetterButton color="var(--twitter-black)" currentColor={currentBackGround} setCurrentBackground={setBackground} />
                <BackgroundSetterButton color="var(--dim-background)" currentColor={currentBackGround} setCurrentBackground={setBackground} />
            </div>

            <div className="flex w-full h-16 justify-between gap-2">

                <ColorCircleButton color="var(--twitter-blue)" currentColor={currentTheme} setCurrentTheme={setTheme}/>

                <ColorCircleButton color="var(--twitter-red)" currentColor={currentTheme} setCurrentTheme={setTheme}/>

                <ColorCircleButton color="var(--twitter-yellow)" currentColor={currentTheme} setCurrentTheme={setTheme}/>

                <ColorCircleButton color="var(--twitter-purple)" currentColor={currentTheme} setCurrentTheme={setTheme}/>


            </div>

        </div>
    )

}

export default TextSetter;