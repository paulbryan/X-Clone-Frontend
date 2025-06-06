import type { User } from "../../types/User";

type FollowersFollowingProps = {
  pageUser: User;
};

function FollowersFollowing({ pageUser }: FollowersFollowingProps) {
  return (
    <>
      <div className="flex text-(--twitter-text)">
        <p>
          <span className="font-bold text-(--text-main)">
            {pageUser.followers.length}
          </span>{" "}
          Followers
        </p>
      </div>
      <div className="flex text-(--twitter-text)">
        <p>
          <span className="font-bold text-(--text-main)">
            {pageUser.following.length}
          </span>{" "}
          Following
        </p>
      </div>
    </>
  );
}

export default FollowersFollowing;