import { useUser } from "../../../lib/hooks/queries/useUser";
import DisplayNameComponent from "../../user/DisplayNameComponent";
import ProfilePic from "../../user/ProfilePic";
import UsernameComponent from "../../user/UsernameComponent";

export function UserSearchResult({ userId }: { userId: number }) {
    const { data: user } = useUser(userId);
    if (!user) return null;

    return (
        <div className="w-full flex gap-2 items-center p-2">
            <div className="w-12 h-12">
                <ProfilePic userId={userId}/>
            </div>
            <div className="flex flex-col text-white">
                <DisplayNameComponent user={user}/>
                <UsernameComponent user={user}/>
            </div>           
        </div>
    );
}