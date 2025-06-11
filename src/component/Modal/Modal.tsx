import type { ReactNode} from "react";
import type { ModalType } from "../../types/ModalType";
import { motion, AnimatePresence } from "framer-motion";

type ModalProps = {
    children: ReactNode;
    setToggle: (type: ModalType) => void;
  };

  const backdropVariant = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };
  
  const modalVariant = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { type: "spring", bounce: 0.3 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } }
  };
  
  function Modal({ children, setToggle }: ModalProps) {
    return (
    <motion.div
      key="backdrop"
      className="w-full z-20 h-full top-0 pt-16 px-4 fixed backdrop-blur-sm flex justify-center items-start bg-black/40"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={backdropVariant}
      onClick={() => setToggle(null)}
    >
      <motion.div
        key="modal"
        className="w-full h-fit"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={modalVariant}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
    );
  }

export default Modal;