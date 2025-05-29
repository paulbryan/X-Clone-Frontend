import type { User } from "../../types/User";

type BannerComponentProps = {
    user: User | null;
  };

function BannerComponent ( { user }: BannerComponentProps ) {

    if (user) {
        return (
            <img className="object-cover h-full w-full" src={user.bannerImage}/>
        )
    } else {
        return null;
    }

}

export default BannerComponent;