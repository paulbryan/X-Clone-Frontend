import { useUser } from "../../hooks/queries/useUser";

type ReplyingToProps = {
    parentId?: number;
    postUserId?: number;
    adjustGridCol?: boolean;
}

export function ReplyingTo ({parentId, postUserId, adjustGridCol}: ReplyingToProps) {

    if (!parentId) return;
    const { data: postUser } = useUser(postUserId ?? -1);

    return (
    <div className={`${adjustGridCol ? "col-start-2" : ""} text-sm text-twitterTextAlt`}>
        <p>Replying to <span className="text-(--color-main)">@{postUser?.username}</span></p>
    </div>    
    )

}