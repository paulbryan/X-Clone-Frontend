import type { NotificationType } from "./NotificationType.ts";
import type { Post } from "./Post.ts";
import type { User } from "./User.ts";

export type Notification = {

    id: number;
    senderId: number;
    receiverId: number;
    referenceId: number;
    text: string;
    type: NotificationType;
    createdAt: string;
    seen: boolean;

}