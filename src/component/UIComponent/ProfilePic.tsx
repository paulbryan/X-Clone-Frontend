import type { User } from "../../types/User";

type ProfilePicComponentProps = {
    user: User | null;
  };

function ProfilePic ({user}: ProfilePicComponentProps) {

    return (
    <>
        {user ? (
            <img
            className="h-auto w-auto rounded-full"
            src= {user.profilePicture}
            />
        ) : (
            <img
            className="h-auto w-auto rounded-full"
            src= {"https://downtownpensacola.com/static/img/defaultbanner.jpg"}
            />
        )}
    </>
    )

}

export default ProfilePic;