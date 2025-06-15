export type User = {

    id: number;
    username: string;
    email: string;
    displayName: string;
    bio: string;
    createdAt: string;
    posts: number[],
    replies: number[],
    likedPosts: number[],
    bookmarkedPosts: number[],
    followers: number[],
    following: number[],
    retweets: number[]

}