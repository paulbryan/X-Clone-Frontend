import type { User } from "../../types/User";

type ProfilePicComponentProps = {
    user?: User | null;
  };

function ProfilePic ({user}: ProfilePicComponentProps) {
    console.log("Base64:", user?.profilePicture?.slice(0, 30));
    return (
    <>
        {user ? (
            <img
            className="h-full w-full rounded-full object-cover"
            src= {`data:image/png;base64,${user.profilePicture}`}
            />
        ) : (
            <div
            className="h-full w-full rounded-full bg-(--twitter-text)"
            > </div>
        )}
    </>
    )

}

export default ProfilePic;