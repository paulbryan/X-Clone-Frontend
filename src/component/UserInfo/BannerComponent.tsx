import type { User } from "../../types/User";

type BannerComponentProps = {
    user?: User | null;
  };

function BannerComponent ( { user }: BannerComponentProps ) {

    if (user) {
        return (
            <img className="object-cover h-full w-full" src={`data:image/jpeg;base64,${user.bannerImage}`}/>
        )
    } else {
        return null;
    }

}

export default BannerComponent;