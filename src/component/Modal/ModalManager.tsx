import { useModal } from "../../context/GlobalState/ModalProvider";
import Modal from "./Modal";
import SignupView from "../ViewComponent/SignupView";
import LoginView from "../ViewComponent/LoginView";
import ComposeTweet from "../Tweet/ComposeTweet";
import { AnimatePresence } from "framer-motion";
import ChangeColorModal from "./ChangeColorModal";


function ModalManager() {
  const { modalType, setModalType, modalData } = useModal();

  return (
    <AnimatePresence>
      {modalType && (
        <Modal setToggle={setModalType}>
          {modalType === "signup" && <SignupView setToggle={setModalType} />}
          {modalType === "login" && <LoginView setToggle={setModalType} />} 
          {modalType === "posting" && <ComposeTweet setToggle={setModalType} />} 
          {modalType === "changeColor" && <ChangeColorModal setToggle={setModalType}/>}
          {modalType === "replying" && modalData && <ComposeTweet setToggle={setModalType} parentId={modalData.mainId} showParentPreview={true}/>}
        </Modal>
      )}
    </AnimatePresence>
  );
}

export default ModalManager;