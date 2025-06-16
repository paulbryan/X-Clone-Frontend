import { usePfp } from "../../hooks/queries/usePfp";

type ProfilePicComponentProps = {
  userId?: number;
};

function ProfilePic({ userId }: ProfilePicComponentProps) {
  const { data: base64, isLoading, isError } = usePfp(userId);

  if (isError || !userId) {
    return <div className="w-full h-full rounded-full bg-red-600 animate-pulse"></div>;
  }

    return (
    <>
      {base64 && !isLoading ? (
        <img
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