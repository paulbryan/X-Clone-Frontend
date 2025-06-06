import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "../../types/User";

type PageUserContextType = {
  pageUser: User | null;
  setPageUser: (user: User | null) => void;
};

const PageUserContext = createContext<PageUserContextType | undefined>(undefined);

export function PageUserProvider({ children }: { children: ReactNode }) {
  const [pageUser, setPageUser] = useState<User | null>(null);

  return (
    <PageUserContext.Provider value={{ pageUser, setPageUser }}>
      {children}
    </PageUserContext.Provider>
  );
}

export function usePageUser() {
  const context = useContext(PageUserContext);
  if (!context) throw new Error("usePageUser must be used within a PageUserProvider");
  return context;
}