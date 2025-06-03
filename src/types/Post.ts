export type Post = {

    id: number;
    userId: number;
    text: string;
    createdAt: string;
    likedBy: number[];
    bookmarkedBy: number[];

}