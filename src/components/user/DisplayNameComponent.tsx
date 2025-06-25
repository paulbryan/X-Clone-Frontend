import { useNavigate } from "react-router-dom";
import type { User } from "../../lib/types/User.ts";

type DisplayNameComponentProps = {
    user?: User | null;
    disableNavigation?: boolean;
    customClassName?: string;
  };

  const trimText = (text: string, maxLength: number): string =>
    text.length > maxLength ? text.slice(0, maxLength - 1).trim() + "…" : text;

function DisplayNameComponent ({user, customClassName, disableNavigation}:DisplayNameComponentProps) {

    const navigate = useNavigate();

    const navigateToProfile = (e: React.MouseEvent<HTMLParagraphElement>): void => {
        if (user && !disableNavigation) {
          e.stopPropagation();
          navigate("/profile/" + user.id);
        }
      }

      const customClass = customClassName ? customClassName : "";
      const hoverDisplay = !disableNavigation ? "hover:cursor-pointer hover:underline" : "";


    if (user && user.displayName) {
        return (
            <p className={hoverDisplay + " " + customClass} onClick={(e) => navigateToProfile(e)}>{trimText(user.displayName, 12)}</p>
        )
    } else if (user) {
        return null;
    } else {
        return <div className="w-18 h-2 bg-twitterTextAlt rounded-l-2xl rounded-r-2xl"></div>
    }

}

export default DisplayNameComponent;