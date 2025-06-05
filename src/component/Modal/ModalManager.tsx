import { useModal } from "../../context/misc/ModalProvider";
import Modal from "./Modal";
import SignupView from "../ViewComponent/SignupView";
import LoginView from "../ViewComponent/LoginView";
import ComposePost from "./ComposePost";
import ReplyModal from "./ReplyModal";

function ModalManager() {
  const { modalType, setModalType } = useModal();

  if (!modalType) return null;

  return (
    <Modal setToggle={setModalType}>
      {modalType === "signup" && <SignupView setToggle={setModalType}/>}
      {modalType === "login" && <LoginView setToggle={setModalType}/>} 
      {modalType === "posting" && <ComposePost/>} 
      {modalType === "replying" && <ReplyModal setToggle={setModalType}/>}
    </Modal>
  );
}

export default ModalManager;