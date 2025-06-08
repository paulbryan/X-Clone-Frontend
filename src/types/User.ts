export type User = {

    id: number;
    username: string;
    email: string;
    displayName: string;
    profilePicture: string;
    bannerImage: string;
    bio: string;
    createdAt: string;
    posts: number[],
    postsAndReplies: number[],
    likedPosts: [],
    bookmarkedPosts: [],
    followers: number[],
    following: number[],

}