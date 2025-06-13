export type User = {

    id: number;
    username: string;
    email: string;
    displayName: string;
    bio: string;
    createdAt: string;
    posts: number[],
    replies: number[],
    likedPosts: [],
    bookmarkedPosts: [],
    followers: number[],
    following: number[],
    retweets: number[]

}