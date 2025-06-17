import { useNavigate } from "react-router-dom";
import type { User } from "../../types/User";

type DisplayNameComponentProps = {
    user?: User | null;
    disableNavigation?: boolean;
  };

function DisplayNameComponent ({user, disableNavigation}:DisplayNameComponentProps) {

    const navigate = useNavigate();

    const navigateToProfile = (e: React.MouseEvent<HTMLParagraphElement>): void => {
        if (user && !disableNavigation) {
          e.stopPropagation();
          navigate("profile/" + user.id);
        }
      }

      const hoverDisplay = !disableNavigation ? "hover:cursor-pointer hover:underline" : "";


    if (user && user.displayName) {
        return (
            <p className={hoverDisplay} onClick={(e) => navigateToProfile(e)}>{user.displayName}</p>
        )
    } else if (user) {
        return null;
    } else {
        return <div className="w-18 h-2 bg-(--twitter-text) rounded-l-2xl rounded-r-2xl"></div>
    }

}

export default DisplayNameComponent;