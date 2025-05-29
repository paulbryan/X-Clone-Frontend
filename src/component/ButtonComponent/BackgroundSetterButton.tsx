
import type { BackgroundType } from "../../types/BackgroundType";

type BackgroundSetterButtonProps = {
    color: BackgroundType;
    currentColor: BackgroundType;
    setCurrentBackground: (color: BackgroundType) => void;
}

function BackgroundSetterButton ({color, currentColor, setCurrentBackground}: BackgroundSetterButtonProps) {



    return (
        <>
        {currentColor == color ? (
            <div 
            style={{ backgroundColor: `${color}` }}
            className="h-10 w-full border border-(--color-main)">

            </div>
        ) : (
            <div 
            onClick={() => setCurrentBackground(color)}
            style={{ backgroundColor: `${color}` }}
            className="h-10 w-full border border-(--twitter-text)">

            </div>
        )}
        </>
    )

}

export default BackgroundSetterButton;