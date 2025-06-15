import { useBanner } from "../../hooks/useBanner";

type BannerComponentProps = {
    userId?: number;
  };

function BannerComponent ( { userId }: BannerComponentProps ) {
  const { data: base64, isLoading, isError } = useBanner(userId);

  
  if (isError || !userId) {
    return <div className="w-full h-full rounded-full bg-red-600 animate-pulse"></div>;
  }

    return (
        <>
        {base64 && !isLoading ? (
            <img className="object-cover h-full w-full" src={`data:image/jpeg;base64,${base64}`}/>
        ) : (
            <div className="h-full w-full bg-gray-600 animate-pulse"></div>
        )}
        </>
    )
}

export default BannerComponent;