import { createContext, useContext, useState } from "react";
import type {ReactNode} from "react";
import type { ModalType } from "../../types/ModalType";

type ModalContextType = {
  modalType: ModalType;
  setModalType: (type: ModalType) => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalType, setModalType] = useState<ModalType>(null);

  return (
    <ModalContext.Provider value={{ modalType, setModalType }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
};