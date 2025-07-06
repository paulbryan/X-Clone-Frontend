import ComposePostMobileButton from "../ui/buttons/ComposePostMobileButton.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../context/Auth/CurrentUserProvider.tsx";
import { HeroIcon } from "../ui/icons/HeroIcon.tsx";
import { useUnseenNotificationIds } from "../../hooks/mutations/useSeenNotifications.tsx";

function FooterBar() {
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();
  const location = useLocation();
  const { data: unseenIds = [] } = useUnseenNotificationIds();

  return (
    <>
      <div className="h-14 w-full bg-(--background-main) text-2xl text-white border-t border-t-twitterBorder flex items-center justify-around">
        <div className="w-full h-full flex items-center justify-center">
          <div onClick={() => navigate("/")}>
            <HeroIcon
              iconName="HomeIcon"
              className="w-7 h-7"
              solid={location.pathname === `/`}
            />
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <div onClick={() => navigate("/explore")}>
            <HeroIcon
              iconName="MagnifyingGlassIcon"
              className="w-7 h-7"
              solid={location.pathname === `/explore`}
            />
          </div>
        </div>
        <div className="w-full h-full flex relative items-center justify-center">
          <div
            onClick={() => (currentUser ? navigate("/notifications") : null)}
          >
            <HeroIcon
              iconName="BellIcon"
              className="w-7 h-7"
              solid={location.pathname === `/notifications`}
            />
          </div>
          {currentUser && unseenIds.length > 0 && (
            <div className="w-4 rounded-full h-4 absolute z-10 bg-(--color-main) top-2 right-9">
              {" "}
            </div>
          )}
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <HeroIcon
            iconName="EnvelopeIcon"
            className="w-7 h-7"
            solid={location.pathname === `/messages`}
          />
        </div>

        {currentUser && <ComposePostMobileButton />}
      </div>
    </>
  );
}

export default FooterBar;
