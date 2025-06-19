import cn from "clsx";
import { usePostMedia } from "../../hooks/queries/UsePostMedia";
import LoadingIcon from "../UIComponent/LoadingIcon";

    type MediaImageProps = {
        id: number;
        roundedClass?: string;
        isModal?: boolean;
    }

    export function MediaImage({id,roundedClass, isModal}: MediaImageProps) {

    const { data, isLoading } = usePostMedia(id);


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