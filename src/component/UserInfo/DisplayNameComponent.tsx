import type { User } from "../../types/User";

type DisplayNameComponentProps = {
    user: User | null;
  };

function DisplayNameComponent ({user}:DisplayNameComponentProps) {

    if (user) {
        return (
            <p>{user.displayName}</p>
        )
    } else {
        return null;
    }

}

export default DisplayNameComponent;