import type { User } from "../../types/User";

type UsernameComponentProps = {
    user?: User | null;
  };
function UsernameComponent ({user}:UsernameComponentProps) {

    if (user) {
        return (
            <p>@{user.username}</p>
        )
    } else {
        return <div className="w-18 h-2 bg-(--twitter-text) rounded-l-2xl rounded-r-2xl"></div>
    }

}

export default UsernameComponent;