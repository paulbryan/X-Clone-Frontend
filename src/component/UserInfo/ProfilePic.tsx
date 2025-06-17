import { useNavigate } from "react-router-dom";
import { usePfp } from "../../hooks/queries/usePfp";

type ProfilePicComponentProps = {
  userId?: number;
  disableNavigation?: boolean;
};

function ProfilePic({ userId, disableNavigation }: ProfilePicComponentProps) {
  const { data: base64, isLoading, isError } = usePfp(userId);

  const navigate = useNavigate();
  const navigateToProfile = (e: React.MouseEvent<HTMLImageElement>): void => {
    if (userId && !disableNavigation) {
      e.stopPropagation();
      navigate("profile/" + userId);
    }
  }

 
  if (isError || !userId) {
    return <div className="w-full h-full rounded-full bg-red-600 animate-pulse"></div>;
  }

    return (
    <>
      {base64 && !isLoading ? (
        <img
        onClick={(e) => navigateToProfile(e)}
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