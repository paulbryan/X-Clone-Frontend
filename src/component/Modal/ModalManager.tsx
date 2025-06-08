import { useModal } from "../../context/misc/ModalProvider";
import Modal from "./Modal";
import SignupView from "../ViewComponent/SignupView";
import LoginView from "../ViewComponent/LoginView";
import ComposePost from "./ComposePost";
import ReplyModal from "./ReplyModal";
import ComposeTweet from "../Tweet/ComposeTweet";
import { AnimatePresence } from "framer-motion";

function ModalManager() {
  const { modalType, setModalType } = useModal();

  return (
    <AnimatePresence>
      {modalType && (
        <Modal setToggle={setModalType}>
          {modalType === "signup" && <SignupView setToggle={setModalType} />}
          {modalType === "login" && <LoginView setToggle={setModalType} />} 
          {modalType === "posting" && <ComposeTweet setToggle={setModalType} />} 
        </Modal>
      )}
    </AnimatePresence>
  );
}

export default ModalManager;