import { useNavigate } from "react-router-dom";
import type { User } from "../../types/User";

type UsernameComponentProps = {
    user?: User | null;
    disableNavigation?: boolean;
  };
function UsernameComponent ({user, disableNavigation}:UsernameComponentProps) {

    const navigate = useNavigate();

    const hoverDisplay = !disableNavigation ? "hover:cursor-pointer" : "";

    const navigateToProfile = (e: React.MouseEvent<HTMLParagraphElement>): void => {
        if (user && !disableNavigation) {
          e.stopPropagation();
          navigate("profile/" + user.id);
        }
      }

    if (user) {
        return (
            <p className={hoverDisplay} onClick={(e) => navigateToProfile(e)}>@{user.username}</p>
        )
    } else {
        return <div className="w-18 h-2 bg-(--twitter-text) rounded-l-2xl rounded-r-2xl"></div>
    }

}

export default UsernameComponent;