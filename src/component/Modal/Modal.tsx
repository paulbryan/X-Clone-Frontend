import type { ReactNode} from "react";
import type { ModalType } from "../../types/ModalType";


type ModalProps = {
    children: ReactNode;
    setToggle: (type: ModalType) => void;
  };
  
  function Modal({ children, setToggle }: ModalProps) {

    return (
        <div 
        className="w-full z-10 h-full top-0 pt-16 px-4 fixed backdrop-blur-xs
        flex justify-center items-start"
        onClick={() => setToggle(null)} 
         >

            <div 
            className="w-full h-fit"
            onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>

        </div>
    )

}

export default Modal;