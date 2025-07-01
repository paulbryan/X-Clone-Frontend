import type { ReactNode} from "react";
import { useNavigate } from "react-router-dom";
import type { Dispatch, SetStateAction } from "react";
import { useCurrentUser } from "../../../context/Auth/CurrentUserProvider";
import { useModal } from "../../../context/GlobalState/ModalProvider";
import { useAuth } from "../../../context/Auth/AuthProvider";


type DrawerNavigationPairProps = {
    children: ReactNode;
    name: string;
    routePath?: string;
    setDrawerOpen?: Dispatch<SetStateAction<boolean>>
    disabled?: boolean;
  };



function DrawerNavigationPair ( { children, name, routePath, disabled, setDrawerOpen }: DrawerNavigationPairProps ) {

    const {setModalType} = useModal();
    const {logout} = useAuth();
    const navigate = useNavigate();
    const {currentUser} = useCurrentUser();

    const onlyOnUserId = () => {
        switch (name) {
            case "Bookmarks" :
            case "Notifications" :
            case "Profile" :
            return true;
            
            default :
            return false;
        }
    }

    const canNavigateAsUser = !onlyOnUserId() || currentUser


    const handleNavigation = () => {
        if (disabled) return;

        if (name == "Log Out" && canNavigateAsUser) {
            logout();
        } else if (routePath && canNavigateAsUser) {
            navigate(routePath);
        } else {
            setModalType("signup");
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
        className={`${!disabled ? "hover:cursor-pointer" : "hover:cursor-not-allowed"} flex h-16 relative text-2xl  text-twitterText items-center gap-4`}>
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