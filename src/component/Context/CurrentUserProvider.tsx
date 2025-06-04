import { createContext, useContext, useEffect, useState } from "react";
import type {ReactNode} from "react";
import type { User } from "../../types/User";
import type { Dispatch, SetStateAction } from "react";

type CurrentUserContextType = {
    currentUser: User | null;
    setCurrentUser: Dispatch<SetStateAction<User | null>>;
    addToFollowing: (followedId: number) => void;
    removeFromFollowing: (followedId: number) => void;
    initializeNotifications: (userId: number) => void;

  };

const CurrentUserContext = createContext<CurrentUserContextType | undefined>(undefined);

export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [notifications, setNotifications] = useState<Notification[] | []>([]);

    const addToFollowing = (followedId: number) => {
      setCurrentUser((prev) => {
        if (prev && !prev.following.includes(followedId)) {
          return {
            ...prev,
            following: [...prev.following, followedId],
          };
        }
        return prev;
      });
    };

    function initializeNotifications (userId: number) {

      fetch(`http://localhost:8080/api/notifications/getAllNotifications/${userId}`)
      .then(res => res.json())
      .then(data => {
        setNotifications(data);
      });

    }

    const removeFromFollowing = (followedId: number) => {
      setCurrentUser((prev) => {
        if (prev && prev.following.includes(followedId)) {
          return {
            ...prev,
            following: prev.following.filter(id => id !== followedId),
          };
        }
        return prev;
      });
    };


    return (
      <CurrentUserContext.Provider value={{initializeNotifications, addToFollowing, removeFromFollowing, currentUser, setCurrentUser}}>
        {children}
      </CurrentUserContext.Provider>
    );
  };
  
  export const useCurrentUser = () => {
    const context = useContext(CurrentUserContext);
    if (!context) throw new Error("useCurrentUser must be used within a ModalProvider");
    return context;
  };