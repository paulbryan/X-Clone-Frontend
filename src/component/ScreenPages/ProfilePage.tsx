import { useEffect, useState } from "react";
import ProfilePageOverview from "../Profile/ProfilePageOverview";
import TabList from "../TabList";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../Context/CurrentUserProvider";
import type { User } from "../../types/User";
import { useUserCache } from "../Context/UserCacheProvider";
import Feed from "../Feed";
import { useFeedContext } from "../Context/FeedContext";

function ProfilePage() {
    const tabs = ["Tweets", "Liked", "Media"];
    const [activeTab, setActiveTab] = useState("Tweets");

    const { currentUserPostsIds } = useFeedContext();
    const { ID } = useParams();
    const pageUserID = Number(ID);

    const { currentUser } = useCurrentUser();
    const { addToUserCache, getUserFromCache, fetchUsersFromServerById } = useUserCache();

    const [pageUser, setPageUser] = useState<User | null>(null);

    useEffect(() => {
        if (pageUserID) {
            console.log("🔍 useEffect: pageUserID changed →", pageUserID);
            determinePageUser();
        }
    }, [pageUserID]);

    async function determinePageUser() {
        console.log("🔍 determinePageUser called for ID:", pageUserID);
        if (currentUser && pageUserID === currentUser.id) {
            console.log("👤 Current user is the page owner.");
            setPageUser(currentUser);
        } else {
            const userInCache = getUserFromCache(pageUserID);
            if (userInCache) {
                console.log("💾 User found in cache:", userInCache);
                setPageUser(userInCache);
            } else {
                console.log("🌐 Fetching user from server...");
                const fetchedUser: User[] = await fetchUsersFromServerById([pageUserID]);
                console.log("✅ Server fetched user:", fetchedUser[0]);
                addToUserCache(fetchedUser[0]);
                setPageUser(fetchedUser[0]);
            }
        }
    }

    function getRelevantPostIds(): number[] {
        if (!pageUser) {
            console.log("⚠️ getRelevantPostIds: pageUser missing");
            return [];
        }

        const isOwner = currentUser && currentUser.id === pageUser.id;
        console.log(`📌 Active Tab: ${activeTab} | Is Owner: ${isOwner}`);

        switch (activeTab) {
            case "Tweets":
                const posts = isOwner ? currentUserPostsIds : pageUser.posts;
                console.log("🧵 Returning posts:", posts);
                return posts;
            case "Liked":
                console.log("❤️ Liked tab selected. (Hardcoded stub)");
                return [0, 0, 0, 0];
            case "Media":
                console.log("🖼️ Media tab selected. (No implementation yet)");
                return [];
            default:
                console.log("❓ Unknown tab selected.");
                return [];
        }
    }

    const postIdsToRender = getRelevantPostIds();

    return (
        <div className="flex flex-col h-full w-full flex-grow overflow-y-auto">
            <ProfilePageOverview pageUser={pageUser} />

            <div>
                <TabList tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            <div className="mb-14">
                <Feed key={activeTab} postIdsArray={postIdsToRender} />
            </div>        
        </div>
    );
}

export default ProfilePage;