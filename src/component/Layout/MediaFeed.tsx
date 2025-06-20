import { MediaImage } from "./MediaImage";

type MediaFeedProps = {
    mediaIds: number[];
}


export function MediaFeed ({mediaIds}: MediaFeedProps) {

    return (
        <div className="w-full h-full grid grid-cols-3">
            {mediaIds.map((id) => (
                <MediaImage id={id}/>
            ))}
        </div>
    )

}