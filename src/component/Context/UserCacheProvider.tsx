import {
    createContext,
    useContext,
    useEffect,
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
    addToFollowers: (followedId: number, currentUserId: number) => void;
    removeFromFollowers: (followedId: number, currentUserId: number) => void;

  };
  
  // 2. Create context
  const UserCacheContext = createContext<UserCacheContextType | undefined>(undefined);
  
  // 3. Provider
  export const UserCacheProvider = ({ children }: { children: ReactNode }) => {
    const [userCache, setUserCache] = useState<Map<number, User>>(new Map());

    const addToFollowers = (followedId: number, currentUserId: number) => {

      setUserCache((prev) => {
        const updated = new Map(prev);
        const user = updated.get(followedId);
        if (user && !user.followers.includes(currentUserId)) {
          updated.set(followedId, {
            ...user,
            followers: [...user.followers, currentUserId],
          });
        }
        return updated;

      });

    }

    const removeFromFollowers = (followedId: number, currentUserId: number) => {

      setUserCache((prev) => {
        const updated = new Map(prev);
        const user = updated.get(currentUserId);
        if (user && user.followers.includes(currentUserId)) {
          updated.set(followedId, {
            ...user,
            followers: user.followers.filter(id => id !== currentUserId),
          });
        }
        return updated;

      });

    }
  
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
      const res = await fetch(`http://localhost:8080/api/users/getUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usersToFetch),
      });
      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }
    
      const users: User[] = await res.json();
      console.log(JSON.stringify(users))
      return users;
    
    };
  
    const getUserFromCache = (id: number) => {
      return userCache.get(id);
    };
  
    return (
      <UserCacheContext.Provider
        value={{addToFollowers, removeFromFollowers, userCache, addToUserCache, removeFromUserCache, getUserFromCache, fetchUsersFromServerById }}
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