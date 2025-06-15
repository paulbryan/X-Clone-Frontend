import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
  } from "react";
  import type { User } from "../../types/User";
import { useCurrentUser } from "../../hooks/CurrentUserProvider";
  
  type UserCacheContextType = {
    userCache: Map<number, User>;
    addToUserCache: (user: User) => void;
    removeFromUserCache: (id: number) => void;
    getUserFromCache: (id: number) => User | undefined;
    fetchUsersFromServerById: (ids: number[]) => Promise<User[]>;
    getOrFetchUserById: (id: number) => Promise<User>;

  };
  
  const UserCacheContext = createContext<UserCacheContextType | undefined>(undefined);
  
  export const UserCacheProvider = ({ children }: { children: ReactNode }) => {
    const [userCache, setUserCache] = useState<Map<number, User>>(new Map());
    const {currentUser} = useCurrentUser();
  
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

    const getOrFetchUserById = async (id: number): Promise<User> => {
      const cached = userCache.get(id);
      if (cached) return cached;
    
      const fetched = await fetchUsersFromServerById([id]);
      if (fetched.length > 0) {
        const user = fetched[0];
        addToUserCache(user);
        return user;
      }
    
      throw new Error(`User ${id} not found`);
    };
  
    const getUserFromCache = (id: number) => {
      if (currentUser && currentUser.id == id) {
        return currentUser;
      } else {
        return userCache.get(id);
      }
    };
  
    return (
      <UserCacheContext.Provider
        value={{getOrFetchUserById, userCache, addToUserCache, removeFromUserCache, getUserFromCache, fetchUsersFromServerById }}
      >
        {children}
      </UserCacheContext.Provider>
    );
  };
  
  export const useUserCache = () => {
    const context = useContext(UserCacheContext);
    if (!context) throw new Error("useUserCache must be used within a UserCacheProvider");
    return context;
  };