import { useNavigate } from "react-router-dom";
import type { User } from "../../lib/types/User.ts";

type UsernameComponentProps = {
    user?: User | null;
    disableNavigation?: boolean;
  };
function UsernameComponent ({user, disableNavigation}:UsernameComponentProps) {

    const navigate = useNavigate();

    const trimText = (text: string, maxLength: number): string =>
      text.length > maxLength ? text.slice(0, maxLength - 1).trim() + "…" : text;

    const hoverDisplay = !disableNavigation ? "hover:cursor-pointer" : "";

    const navigateToProfile = (e: React.MouseEvent<HTMLParagraphElement>): void => {
        if (user && !disableNavigation) {
          e.stopPropagation();
          navigate("profile/" + user.id);
        }
      }

    if (user) {
        return (
            <p className={hoverDisplay} onClick={(e) => navigateToProfile(e)}>@{trimText(user.username, 12)}</p>
        )
    } else {
        return <div className="w-18 h-2 bg-twitterTextAlt rounded-l-2xl rounded-r-2xl"></div>
    }

}

export default UsernameComponent;