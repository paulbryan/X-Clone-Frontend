import type { ReactNode} from "react";
import { useNavigate } from "react-router-dom";
import type { Dispatch, SetStateAction } from "react";


type DrawerNavigationPairProps = {
    children: ReactNode;
    name: string;
    routePath?: string;
    setDrawerOpen?: Dispatch<SetStateAction<boolean>>
    disabled?: boolean;
  };



function DrawerNavigationPair ( { children, name, routePath, disabled, setDrawerOpen }: DrawerNavigationPairProps ) {

    const navigate = useNavigate();

    const handleNavigation = () => {
        if (disabled) return;
        if (routePath) {
            navigate(routePath);
        }

        setTimeout(() => {
            if (setDrawerOpen) {
                setDrawerOpen(false);
            }
        }, 50)

    } 

    return (
        <div 
        onClick={() => handleNavigation()}
        className={`${disabled ? "hover:cursor-not-allowed" : "hover:cursor-pointer"} flex h-16 relative text-2xl  text-twitterText items-center gap-4`}>
            <div
            className="text-3xl">
                {children}
            </div>
            <div onClick={() => handleNavigation()}>
                <p className={`font-bold md:font-medium`}>{name}</p>
            </div>

        </div>
    )

}

export default DrawerNavigationPair