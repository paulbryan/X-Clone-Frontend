import {
    createContext,
    useContext,
    useState,
    type ReactNode,
  } from "react";
  import type { User } from "../../types/User";
  
  // 1. Context type with functions
  type UserCacheContextType = {
    userCache: Map<number, User>;
    addToUserCache: (user: User) => void;
    removeFromUserCache: (id: number) => void;
    getUserFromCache: (id: number) => User | undefined;
    fetchUsersFromServerById: (ids: number[]) => Promise<User[]>;

  };
  
  // 2. Create context
  const UserCacheContext = createContext<UserCacheContextType | undefined>(undefined);
  
  // 3. Provider
  export const UserCacheProvider = ({ children }: { children: ReactNode }) => {
    const [userCache, setUserCache] = useState<Map<number, User>>(new Map());
  
    const addToUserCache = (user: User) => {
      setUserCache(prev => {
        const updated = new Map(prev);
        updated.set(user.id, user);
        return updated;
      });
    };
  
    const removeFromUserCache = (id: number) => {
      setUserCache(prev => {
        const updated = new Map(prev);
        updated.delete(id);
        return updated;
      });
    };

    const fetchUsersFromServerById = async (usersToFetch: number[]): Promise<User[]> => {
      const res = await fetch(`http://localhost:8080/api/posts/getPost`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usersToFetch),
      });
    
    const data: User[] = await res.json();
      return data;
    };
  
    const getUserFromCache = (id: number) => {
      return userCache.get(id);
    };
  
    return (
      <UserCacheContext.Provider
        value={{ userCache, addToUserCache, removeFromUserCache, getUserFromCache, fetchUsersFromServerById }}
      >
        {children}
      </UserCacheContext.Provider>
    );
  };
  
  // 4. Hook
  export const useUserCache = () => {
    const context = useContext(UserCacheContext);
    if (!context) throw new Error("useUserCache must be used within a UserCacheProvider");
    return context;
  };