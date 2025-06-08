import { createContext, useContext, useState } from "react";
import type {ReactNode} from "react";
import type { ModalType } from "../../types/ModalType";
import type { Post } from "../../types/Post";

type ModalContextType = {
  modalType: ModalType;
  setModalType: (type: ModalType) => void;
  modalData: number | null;
  modalPostData: Post | null;
  setModalData: (num: number) => void;
  setModalPostData: (post: Post) => void;
};  

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalPostData, setModalPostData] = useState<Post | null>(null);
  const [modalData, setModalData] = useState<number | null>(null);

  return (
    <ModalContext.Provider value={{ modalType, setModalType, modalData, modalPostData, setModalData, setModalPostData }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
};