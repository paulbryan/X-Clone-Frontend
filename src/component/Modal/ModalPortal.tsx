import { createPortal } from "react-dom";

function Modal({ children }) {
  return createPortal(
    <div className="fixed top-0 left-0 w-full h-full bg-black/60 z-50">
      {children}
    </div>,
    document.getElementById("modal-root")!
  );
}