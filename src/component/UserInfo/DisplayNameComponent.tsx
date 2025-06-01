import type { User } from "../../types/User";

type DisplayNameComponentProps = {
    user?: User | null;
  };

function DisplayNameComponent ({user}:DisplayNameComponentProps) {

    if (user && user.displayName) {
        return (
            <p>{user.displayName}</p>
        )
    } else if (user) {
        return null;
    } else {
        return <div className="w-18 h-2 bg-(--twitter-text) rounded-l-2xl rounded-r-2xl"></div>
    }

}

export default DisplayNameComponent;