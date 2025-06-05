import { useModal } from "../../context/misc/ModalProvider";
import Modal from "./Modal";
import SignupView from "../ViewComponent/SignupView";
import LoginView from "../ViewComponent/LoginView";
import ComposePost from "./ComposePost";

function ModalManager() {
  const { modalType, setModalType } = useModal();

  if (!modalType) return null;

  return (
    <Modal setToggle={setModalType}>
      {modalType === "signup" && <SignupView setToggle={setModalType}/>}
      {modalType === "login" && <LoginView setToggle={setModalType}/>} 
      {modalType === "posting" && <ComposePost/>} 
    </Modal>
  );
}

export default ModalManager;