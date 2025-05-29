import { createContext, useContext, useState } from "react";
import type {ReactNode} from "react";
import type { User } from "../../types/User";
import type { Dispatch, SetStateAction } from "react";

type CurrentUserContextType = {
    currentUser: User | null;
    setCurrentUser: Dispatch<SetStateAction<User | null>>;
  };

const CurrentUserContext = createContext<CurrentUserContextType | undefined>(undefined);

const testUser: User = {

    id: 1,
    username: "jokerhut",
    displayName: "Jokerhut",
    profilePicture: "https://cdn.discordapp.com/attachments/1138945433759141959/1376602222435106896/2ntWrRqt_400x400.jpg?ex=6835ec39&is=68349ab9&hm=bbaebea6655957f92c695a635a81dbfb2227bf30c0c4d9e50b855e52dfe88a33&",
    bannerImage: "https://png.pngtree.com/thumb_back/fh260/background/20200706/pngtree-magnificent-cosmic-space-blue-nebula-background-image_347731.jpg",
    bio: "21 year old on my web development journey. Main languages are Java and ReactJS.",
    createdAt: "December 2024"

}

export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(testUser);
    return (
      <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
        {children}
      </CurrentUserContext.Provider>
    );
  };
  
  export const useCurrentUser = () => {
    const context = useContext(CurrentUserContext);
    if (!context) throw new Error("useCurrentUser must be used within a ModalProvider");
    return context;
  };