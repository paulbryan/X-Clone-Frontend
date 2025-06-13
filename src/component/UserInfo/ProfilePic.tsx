import { useEffect, useState } from "react";
import { useUserMediaCache } from "../../context/cache/UserMediaCacheProvider";
import type { User } from "../../types/User";

type ProfilePicComponentProps = {
    userId?: number | null;
  };

function ProfilePic ({userId}: ProfilePicComponentProps) {
  const { getUserMediaFromCache, addToUserMediaCache } = useUserMediaCache();
  const cachedPic = userId ? getUserMediaFromCache(userId)?.profilePic : null;
  const [base64, setBase64] = useState<string | null>(cachedPic ?? null);


  //TODO somehow prevent repeat calls from posts. Maybe whenever fetching users in notfound add to some pfpstofetch
  
  useEffect(() => {
    if (!userId || cachedPic) return;

    console.log(" Fetching pfp for " + userId)
    fetch(`http://localhost:8080/api/users/getProfilePic?id=${userId}`)
      .then((res) => res.text())
      .then((data) => {
        addToUserMediaCache(userId, {
          ...(getUserMediaFromCache(userId) || {}),
          profilePic: data,
        });
        setBase64(data);
      })
      .catch((err) => {
        console.error("Error fetching profile picture:", err);
      });
  }, [userId, cachedPic]);

    return (
    <>
      {base64 ? (
        <img
        className="h-full w-full rounded-full object-cover"
        src= {`data:image/png;base64,${base64}`}
        />
      ) : (
        <div className="w-full h-full rounded-full bg-gray-600 animate-pulse"></div>
      )}
    </>
    )
}

export default ProfilePic;