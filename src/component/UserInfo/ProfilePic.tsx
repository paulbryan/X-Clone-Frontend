import { useEffect, useState } from "react";
import { useUserMediaCache } from "../../context/cache/UserMediaCacheProvider";
import type { User } from "../../types/User";

type ProfilePicComponentProps = {
    userId?: number | null;
  };

function ProfilePic ({userId}: ProfilePicComponentProps) {
    const { getUserMediaFromCache, addToUserMediaCache } = useUserMediaCache();
    const [base64, setBase64] = useState<string | null>(null);
  
    useEffect(() => {
      if (!userId) return;
  
      const cached = getUserMediaFromCache(userId);
      if (cached?.profilePic) {
        console.log("cached pfp: " +JSON.stringify(cached.profilePic))
        setBase64(cached.profilePic);
        return;
      }
  
      fetch(`http://localhost:8080/api/users/getProfilePic?id=${userId}`)
        .then((res) => res.text())
        .then((data) => {
          addToUserMediaCache(userId, {
            ...(cached || {}),
            profilePic: data,
          });
          console.log("fetched pfp: " +JSON.stringify(data))

          setBase64(data);
        })
        .catch((err) => {
          console.error("Error fetching profile picture:", err);
        });
    }, [userId]);

    return (
    <>
        {base64 ? (
            <img
            className="h-full w-full rounded-full object-cover"
            src= {`data:image/png;base64,${base64}`}
            />
        ) : (
            <div
            className="h-full w-full rounded-full bg-(--twitter-text) animate-pulse"
            > </div>
        )}
    </>
    )

}

export default ProfilePic;