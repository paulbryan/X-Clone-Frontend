import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { API_URL } from "../../constants/env";

type AuthContextType = {
    authId: number | null;
    setAuthId: (num: number) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authId, setAuthId] = useState<number | null>(null);

  const logout = () => {
    localStorage.removeItem("jwt");
    setAuthId(null);
    window.location.reload();
  };
  
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) return;
  
      try {
        const res = await fetch(`${API_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!res.ok) {
          localStorage.removeItem("jwt");
          return;
        }
  
        const user = await res.json();
        setAuthId(user.id);
      } catch (err) {
        console.error("Token check failed:", err);
        localStorage.removeItem("jwt");
      }
    };
  
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ authId, setAuthId, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};