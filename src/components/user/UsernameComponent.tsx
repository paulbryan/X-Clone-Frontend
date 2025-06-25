import { useNavigate } from "react-router-dom";
import type { User } from "../../lib/types/User.ts";
import { trimText } from "../../lib/utils/TextTrimmerUtils.ts";

type UsernameComponentProps = {
    user?: User | null;
    disableNavigation?: boolean;
    truncate?: boolean;
  };
function UsernameComponent ({user, disableNavigation, truncate}:UsernameComponentProps) {

    const navigate = useNavigate();

    const textToDisplay = user && (truncate ? trimText(user?.username, 12) : user?.username);


    const hoverDisplay = !disableNavigation ? "hover:cursor-pointer" : "";

    const navigateToProfile = (e: React.MouseEvent<HTMLParagraphElement>): void => {
        if (user && !disableNavigation) {
          e.stopPropagation();
          navigate("profile/" + user.id);
        }
      }

    if (user) {
        return (
            <p className={hoverDisplay} onClick={(e) => navigateToProfile(e)}>@{textToDisplay}</p>
        )
    } else {
        return <div className="w-18 h-2 bg-twitterTextAlt rounded-l-2xl rounded-r-2xl"></div>
    }

}

export default UsernameComponent;