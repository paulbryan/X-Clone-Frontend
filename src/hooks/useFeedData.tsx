import { usePosts } from "./usePosts";

export const useFeedData = (postIds: number[]) => {
  const { data: posts, isLoading: postsLoading } = usePosts(postIds);

  return {
    posts,
    postsLoading,
    allReady: !postsLoading && !!posts,
  };
};