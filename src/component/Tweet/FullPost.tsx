import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PostTemplate from "./PostTemplate";
import ProfilePic from "../UserInfo/ProfilePic";
import { useCurrentUser } from "../../context/currentUser/CurrentUserProvider";
import { usePostCache } from "../../context/cache/PostCacheProvider";
import { useUserCache } from "../../context/cache/UserCacheProvider";
import type { User } from "../../types/User";
import FullPostTemplate from "./FullPostTemplate";

function FullPost() {
  const { postId } = useParams();
  const numericPostId = Number(postId);

  const { currentUser } = useCurrentUser();
  const { getPostFromCache, getOrFetchPostById } = usePostCache();
  const { getOrFetchUserById } = useUserCache();

  const [postUser, setPostUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const post = getPostFromCache(numericPostId) ?? (await getOrFetchPostById(numericPostId));
      if (!post) return;
      const user = await getOrFetchUserById(post.userId);
      setPostUser(user);
    };
    loadUser();
  }, [numericPostId]);

  return (
    <div className="flex flex-col w-full text-white">

      {/* Main Post */}
      <FullPostTemplate key={postId} mainPost={true} fullPost={true} postId={numericPostId} />


    </div>
  );
}

export default FullPost;