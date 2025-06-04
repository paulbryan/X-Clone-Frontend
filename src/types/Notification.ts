export type NotificationType = {
    
    id: number;
    senderId: number;
    receiverId: number;
    postId?: number;
    type: NotificationType;
    createdAt: string;
    seen: boolean;

}