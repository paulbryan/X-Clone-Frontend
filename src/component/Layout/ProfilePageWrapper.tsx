import { PageUserProvider } from "../../context/currentUser/PageUserContext";
import ProfilePage from "./ProfilePage";

function ProfilePageWrapper() {
  return (
    <PageUserProvider>
      <ProfilePage />
    </PageUserProvider>
  );
}

export default ProfilePageWrapper;