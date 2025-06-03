import { createContext, useContext, useState } from "react";
import type {ReactNode} from "react";
import type { User } from "../../types/User";
import type { Dispatch, SetStateAction } from "react";

type CurrentUserContextType = {
    currentUser: User | null;
    setCurrentUser: Dispatch<SetStateAction<User | null>>;
  };

const CurrentUserContext = createContext<CurrentUserContextType | undefined>(undefined);

export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    


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