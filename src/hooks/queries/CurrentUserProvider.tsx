import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";
import type { User } from "../../types/User";
import { useAuth } from "../../context/Auth/AuthProvider";
type CurrentUserQueryContextType = {
  currentUser: User | undefined;
  isLoading: boolean;
};

const CurrentUserContext = createContext<CurrentUserQueryContextType | undefined>(undefined);

export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {

  const { authId } = useAuth();

  const fetchCurrentUser = async (): Promise<User> => {
    console.log("[fetchCurrentUser] Starting fetch...");
    const res = await fetch(`http://localhost:8080/api/users/getUser?id=${authId}`);
    if (!res.ok) throw new Error("Failed to fetch current user");
    const user = await res.json();
    console.log("[fetchCurrentUser] Success:", user);
    return user;
  };

  const { data: currentUser, isLoading } = useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    enabled: !!authId,
  });

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        isLoading,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);
  if (!context) throw new Error("useCurrentUser must be used within a CurrentUserProvider");
  return context;
};


