import { useEffect, useState } from "react";
import { useUserMediaCache } from "../../context/cache/UserMediaCacheProvider";
import type { User } from "../../types/User";

type ProfilePicComponentProps = {
    userId?: number | null;
  };

function ProfilePic ({userId}: ProfilePicComponentProps) {
  const { getUserMediaFromCache, addToUserMediaCache } = useUserMediaCache();
  const cached = userId ? getUserMediaFromCache(userId) : undefined;
  const [base64, setBase64] = useState<string | null>(
    cached?.profilePic ?? null
  );

  useEffect(() => {
    if (!userId || cached?.profilePic) return;

    fetch(`http://localhost:8080/api/users/getProfilePic?id=${userId}`)
      .then((res) => res.text())
      .then((data) => {
        addToUserMediaCache(userId, {
          ...(cached || {}),
          profilePic: data,
        });
        setBase64(data);
      })
      .catch((err) => {
        console.error("Error fetching profile picture:", err);
      });
  }, [userId]);

    return (
    <>
      <img
      className="h-full w-full rounded-full object-cover"
      src= {base64 ? `data:image/png;base64,${base64}` : "https://plus.unsplash.com/premium_photo-1701090939615-1794bbac5c06?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JheSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D"}
      />
    </>
    )

}

export default ProfilePic;