import { useEffect, useState } from "react";
import type { User } from "../../types/User";
import { useUserMediaCache } from "../../context/cache/UserMediaCacheProvider";

type BannerComponentProps = {
    userId?: number | null;
  };

function BannerComponent ( { userId }: BannerComponentProps ) {
    const { getUserMediaFromCache, addToUserMediaCache } = useUserMediaCache();
    const [base64, setBase64] = useState<string | null>(null);
  
    useEffect(() => {
      if (!userId) return;
  
      const cached = getUserMediaFromCache(userId);
      if (cached?.bannerImage) {
        console.log("cached banner: " +JSON.stringify(cached.bannerImage))
        setBase64(cached.bannerImage);
        return;
      }
  
      fetch(`http://localhost:8080/api/users/getBannerImage?id=${userId}`)
        .then((res) => res.text())
        .then((data) => {
          addToUserMediaCache(userId, {
            ...(cached || {}),
            bannerImage: data,
          });
          console.log("fetched pfp: " +JSON.stringify(data))

          setBase64(data);
        })
        .catch((err) => {
          console.error("Error fetching banner picture:", err);
        });
    }, [userId]);

    return (
        <>
        {base64 ? (
            <img className="object-cover h-full w-full" src={`data:image/jpeg;base64,${base64}`}/>
        ) : (
            <div className="h-full w-full bg-gray-600 animate-pulse"></div>
        )}
        </>
    )
}

export default BannerComponent;