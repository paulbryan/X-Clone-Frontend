import { useNavigate } from "react-router-dom";
import { useUser } from "../../../lib/hooks/queries/useUser";
import DisplayNameComponent from "../../user/DisplayNameComponent";
import ProfilePic from "../../user/ProfilePic";
import UsernameComponent from "../../user/UsernameComponent";
import { UserHoverWrapper } from "../../ui/UserHoverWrapper";

export function UserSearchResult({ userId }: { userId: number }) {
  const { data: user } = useUser(userId);
  const navigate = useNavigate();
  if (!user) return null;

  return (
    <div
      onClick={() => navigate("/profile/" + user.id)}
      className="w-full flex gap-2 hover:cursor-pointer hover:bg-twitterTextAlt/20 items-center py-3 px-2"
    >
      <UserHoverWrapper userId={userId}>
        <div className="w-10 h-10">
          <ProfilePic userId={userId} />
        </div>
      </UserHoverWrapper>
      <div className="flex text-sm flex-col text-twitterTextAlt">
        <UserHoverWrapper userId={userId}>
          <div>
            <DisplayNameComponent
              customClassName="text-twitterText text-md font-bold"
              user={user}
            />
          </div>
        </UserHoverWrapper>
        <UserHoverWrapper userId={userId}>
          <div>
            <UsernameComponent user={user} />
          </div>
        </UserHoverWrapper>
      </div>
    </div>
  );
}
