import { createContext, useContext, useEffect, useState } from "react";
import type {ReactNode} from "react";
import type { User } from "../../types/User";
import type { Dispatch, SetStateAction } from "react";
import type { NotificationType } from "../../types/NotificationType";
import type { Notification } from "../../types/Notification";

type CurrentUserContextType = {
    currentUser: User | null;
    setCurrentUser: Dispatch<SetStateAction<User | null>>;
    addToFollowing: (followedId: number) => void;
    removeFromFollowing: (followedId: number) => void;
    initializeNotifications: (userId: number) => void;
    notifications: Notification[];
    unreadNotifications: number[];
    clearRead: () => void;

  };

const CurrentUserContext = createContext<CurrentUserContextType | undefined>(undefined);

export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadNotifications, setUnreadNotifications] = useState<number[]>([]); 

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

    function clearRead () {
      setUnreadNotifications([]);
    }

    function setUnreadLength (notifArray: Notification[]) {
      let unread: number[] = [];
      for (let i = 0; i < notifArray.length; i++) {
        if (!notifArray[i].seen) {
          unread.push(notifArray[i].id)
        }
      }
      setUnreadNotifications(unread);
    }

    function initializeNotifications (userId: number) {

      fetch(`http://localhost:8080/api/notifications/getAllNotifications/${userId}`)
      .then(res => res.json())
      .then(data => {
        console.log("New notifications are" + JSON.stringify(data))
        setNotifications(data);
        setUnreadLength(data);
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
      <CurrentUserContext.Provider value={{unreadNotifications, clearRead, notifications, initializeNotifications, addToFollowing, removeFromFollowing, currentUser, setCurrentUser}}>
        {children}
      </CurrentUserContext.Provider>
    );
  };
  
  export const useCurrentUser = () => {
    const context = useContext(CurrentUserContext);
    if (!context) throw new Error("useCurrentUser must be used within a ModalProvider");
    return context;
  };