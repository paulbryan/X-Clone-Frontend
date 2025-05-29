import type { User } from "../../types/User";

type BioComponentProps = {
    user: User | null;
  };

function BioComponent ( {user}: BioComponentProps ) {


    if (user && user.bio) {
        return (
            <p>{user.bio}</p>
        )
    } else {
        return null;
    }

}

export default BioComponent;