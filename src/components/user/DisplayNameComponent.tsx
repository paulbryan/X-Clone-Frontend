import { useNavigate } from "react-router-dom";
import type { User } from "../../lib/types/User.ts";
import { trimText } from "../../lib/utils/TextTrimmerUtils.ts";

type DisplayNameComponentProps = {
    user?: User | null;
    disableNavigation?: boolean;
    customClassName?: string;
    truncate?: boolean;
    showForSample?: boolean;

  };


function DisplayNameComponent ({user, customClassName, disableNavigation, truncate, showForSample}:DisplayNameComponentProps) {

    const navigate = useNavigate();


    const navigateToProfile = (e: React.MouseEvent<HTMLParagraphElement>): void => {
        if (user && !disableNavigation) {
          e.stopPropagation();
          navigate("/profile/" + user.id);
        }
      }

      const customClass = customClassName ? customClassName : "";
      const hoverDisplay = !disableNavigation ? "hover:cursor-pointer hover:underline" : "";

      const textToDisplay = user && (truncate ? trimText(user?.displayName, 12) : user?.displayName);

      if (showForSample) return <p className={hoverDisplay + " " + customClass}>X</p>



    if (user && user.displayName) {
        return (
            <p className={hoverDisplay + " " + customClass} onClick={(e) => navigateToProfile(e)}>{textToDisplay}</p>
        )
    } else if (user) {
        return null;
    } else {
        return <div className="w-18 h-2 bg-twitterTextAlt rounded-l-2xl rounded-r-2xl"></div>
    }

}

export default DisplayNameComponent;