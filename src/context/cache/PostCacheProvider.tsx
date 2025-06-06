import {
    createContext,
    useContext,
    useState,
    type ReactNode,
  } from "react";
import type { Post } from "../../types/Post";
  
  type PostCacheContextType = {
    postCache: Map<number, Post>;
    addToPostCache: (user: Post) => void;
    removeFromPostCache: (id: number) => void;
    getPostFromCache: (id: number) => Post | undefined;
    fetchPostsFromServerById: (ids: number[]) => Promise<Post[]>;

    getSinglePost: (id: number) => Promise<Post>;
    getOrFetchPostById: (id: number) => Promise<Post>;

    };
  
  const PostCacheContext = createContext<PostCacheContextType | undefined>(undefined);
  
  export const PostCacheProvider = ({ children }: { children: ReactNode }) => {
    const [postCache, setPostCache] = useState<Map<number, Post>>(new Map());
  
    const addToPostCache = (post: Post) => {
      setPostCache(prev => {
        const updated = new Map(prev);
        updated.set(post.id, post);
        return updated;
      });
    };

    const fetchPostsFromServerById = async (postsToFetch: number[]): Promise<Post[]> => {
      const res = await fetch(`http://localhost:8080/api/posts/getPost`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postsToFetch),
      });
    
      const data: Post[] = await res.json();
      return data;
    };
  
    const removeFromPostCache = (id: number) => {
      setPostCache(prev => {
        const updated = new Map(prev);
        updated.delete(id);
        return updated;
      });
    };

    const getOrFetchPostById = async (id: number, options?: { forceRefresh?: boolean }) => {
      if (!options?.forceRefresh) {
        const cached = getPostFromCache(id);
        if (cached) return cached;
      }
    
      return getSinglePost(id); // handles caching inside now
    };
  
    const getPostFromCache = (id: number) => {
      return postCache.get(id);
    };

    const getSinglePost = async (id: number): Promise<Post> => {
      const res = await fetch(`http://localhost:8080/api/posts/getSinglePost/${id}`);
      if (!res.ok) throw new Error(`Failed to fetch post ${id}`);
      const post: Post = await res.json();
    
      addToPostCache(post); // ✅ cache it always
      return post;
    };
  
    return (
      <PostCacheContext.Provider
        value={{getSinglePost, getOrFetchPostById, postCache, addToPostCache, removeFromPostCache, getPostFromCache, fetchPostsFromServerById }}
      >
        {children}
      </PostCacheContext.Provider>
    );
  };
  
  export const usePostCache = () => {
    const context = useContext(PostCacheContext);
    if (!context) throw new Error("usePostCache must be used within a PostCacheProvider");
    return context;
  };