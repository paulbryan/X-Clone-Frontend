import cn from "clsx";
import { usePostMedia } from "../../hooks/queries/UsePostMedia";

    export function MediaImage({
    id,roundedClass,
    }: {
    id: number;
        roundedClass?: string;
    }) {

    const { data, isLoading } = usePostMedia(id);
    if (isLoading || !data) return null;


    return (
    <img
        src={data.src}
        alt={data.alt}
        className={cn("w-full h-full object-cover", roundedClass)}
    />
    );
    }