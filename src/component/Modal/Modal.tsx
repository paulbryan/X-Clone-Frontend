import type { ReactNode} from "react";
import type { ModalType } from "../../types/ModalType";
import { motion } from "framer-motion";
import { backdropMotionProps, modalMotionProps } from "../../lib/animations/motionAnimations";

type ModalProps = {
    children: ReactNode;
    setToggle: (type: ModalType) => void;
  };
  
  function Modal({ children, setToggle }: ModalProps) {
    return (
    <motion.div
      key="backdrop"
      className="w-full z-10 h-full top-0 pt-16 px-4 fixed backdrop-blur-sm flex justify-center items-start bg-black/40"
      {...backdropMotionProps}
      onClick={() => setToggle(null)}
    >
      <motion.div
        key="modal"
        className="w-full h-fit"
        {...modalMotionProps}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
    );
  }

export default Modal;