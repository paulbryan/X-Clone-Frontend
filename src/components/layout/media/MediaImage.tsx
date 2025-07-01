import cn from "clsx";
import { usePostMedia } from "../../../lib/hooks/queries/UsePostMedia.tsx";
import LoadingIcon from "../../ui/LoadingIcon.tsx";

    type MediaImageProps = {
        id: number;
        roundedClass?: string;
        isModal?: boolean;
    }

    export function MediaImage({id,roundedClass, isModal}: MediaImageProps) {

    const { data } = usePostMedia(id);


    return (
        <>
        {data ? (
            <img
                src={data.src}
                alt={data.alt}
                className={cn("w-full h-full object-cover", roundedClass)}
            />
        ) : !isModal ? (

            <div className={cn(" bg-gray-600 animate-pulse w-full h-full object-cover", roundedClass)}></div>

        ) : (
            <LoadingIcon className="w-12 h-12"/>
        )}
        </>
    )
    }