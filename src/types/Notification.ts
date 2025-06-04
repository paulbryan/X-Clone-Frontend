import type { NotificationType } from "./NotificationType";

export type Notification = {

    id: number;
    senderId: number;
    receiverId: number;
    postId?: number;
    type: NotificationType;
    createdAt: string;
    seen: boolean;

}