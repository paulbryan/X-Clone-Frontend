import type { ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalPortalProps = {
  children: ReactNode;
};

function ModalPortal({ children }: ModalPortalProps) {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-full bg-black/60 z-50">
      {children}
    </div>,
    modalRoot
  );
}

export default ModalPortal;