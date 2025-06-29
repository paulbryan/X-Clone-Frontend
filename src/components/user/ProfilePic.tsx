import { useNavigate } from "react-router-dom";
import { usePfp } from "../../lib/hooks/queries/usePfp.tsx";

type ProfilePicComponentProps = {
  userId?: number;
  disableNavigation?: boolean;
  showForSample?: boolean;
};

function ProfilePic({ userId, disableNavigation, showForSample }: ProfilePicComponentProps) {
  const { data: base64, isLoading, isError } = usePfp(userId);
  

  const navigate = useNavigate();
  const navigateToProfile = (e: React.MouseEvent<HTMLImageElement>): void => {
    if (userId && !disableNavigation) {
      e.stopPropagation();
      navigate("/profile/" + userId);
    }
  }

  if (showForSample) return (
    <img
    onClick={(e) => navigateToProfile(e)}
    className={`h-full w-full rounded-full object-cover ${disableNavigation ? "" : "hover:opacity-75"}`}
    src= {`https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg`}
    />
  )

  if (isError || !userId) {
    return <div className="w-full h-full rounded-full bg-gray-600 animate-pulse"></div>;
  }

    return (
    <>
      {base64 && !isLoading ? (
        <img
        onClick={(e) => navigateToProfile(e)}
        className={`h-full w-full rounded-full object-cover ${disableNavigation ? "" : "hover:opacity-75"}`}
        src= {`data:image/png;base64,${base64}`}
        />
      ) : (
        <div className="w-full h-full rounded-full bg-gray-600 animate-pulse"></div>
      )}
    </>
    )
}

export default ProfilePic;