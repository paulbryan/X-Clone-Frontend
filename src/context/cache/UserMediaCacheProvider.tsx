import {
    createContext,
    useContext,
    useState,
    type ReactNode,
  } from "react";
  import type { UserMedia } from "../../types/UserMedia";
  
  type UserMediaCacheContextType = {
    getUserMediaFromCache: (userId: number) => UserMedia | undefined;
    addToUserMediaCache: (userId: number, media: UserMedia) => void;
    userMediaCache: Map<number, UserMedia>;
  };
  
  const UserMediaCacheContext = createContext<UserMediaCacheContextType | undefined>(undefined);
  
  export const UserMediaCacheProvider = ({ children }: { children: ReactNode }) => {
    const [userMediaCache, setUserMediaCache] = useState<Map<number, UserMedia>>(new Map());
  
    const getUserMediaFromCache = (userId: number) => {
      return userMediaCache.get(userId);
    };
  
    const addToUserMediaCache = (userId: number, media: UserMedia) => {
      setUserMediaCache(prev => new Map(prev).set(userId, media));
    };
  
    return (
      <UserMediaCacheContext.Provider
        value={{ getUserMediaFromCache, addToUserMediaCache, userMediaCache }}
      >
        {children}
      </UserMediaCacheContext.Provider>
    );
  };
  
  export const useUserMediaCache = () => {
    const context = useContext(UserMediaCacheContext);
    if (!context) {
      throw new Error("useUserMediaCache must be used within a UserMediaCacheProvider");
    }
    return context;
  }