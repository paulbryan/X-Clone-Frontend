import type { User } from "../../types/User";

type UsernameComponentProps = {
    user: User | null;
  };
function UsernameComponent ({user}:UsernameComponentProps) {

    if (user) {
        return (
            <p>{user.username}</p>
        )
    } else {
        return null;
    }

}

export default UsernameComponent;