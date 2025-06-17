import type { ReactNode} from "react";
import { useNavigate } from "react-router-dom";
import type { Dispatch, SetStateAction } from "react";


type DrawerNavigationPairProps = {
    children: ReactNode;
    name: string;
    routePath?: string;
    setDrawerOpen?: Dispatch<SetStateAction<boolean>>
  };



function DrawerNavigationPair ( { children, name, routePath, setDrawerOpen }: DrawerNavigationPairProps ) {

    const navigate = useNavigate();

    const handleNavigation = () => {

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
        className="flex h-16 text-2xl text-(--text-main) items-center gap-4">
            <div
            className="text-3xl hover:cursor-pointer">
                {children}
            </div>
            <div onClick={() => handleNavigation()}>
                <p className="font-bold hover:cursor-pointer">{name}</p>
            </div>

        </div>
    )

}

export default DrawerNavigationPair