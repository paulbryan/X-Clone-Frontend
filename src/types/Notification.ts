import type { NotificationType } from "./NotificationType";
import type { Post } from "./Post";
import type { User } from "./User";

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