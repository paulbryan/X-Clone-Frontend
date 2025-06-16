import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "../../types/User";

type AuthContextType = {
    authId: number | null;
    setAuthId: (num: number) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authId, setAuthId] = useState<number | null>(null);

  return (
    <AuthContext.Provider value={{ authId, setAuthId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};