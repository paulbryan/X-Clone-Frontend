import { useState } from "react";
import { useModal } from "../../../context/GlobalState/ModalProvider";
import type { ModalType } from "../../../types/ModalType";
import { MediaImage } from "../../Layout/MediaImage";

type ImageModalProps = {
    setToggle: (modalType: ModalType) => void;
    mediaId: number;
    mediaList: number[]
  };






  
  function ImageModal({ setToggle, mediaId, mediaList }: ImageModalProps) {

    const [currentIndex, setCurrentIndex] = useState(mediaList.indexOf(mediaId));

    return (
      <div className="p-6 rounded-xl w-96 mx-auto mt-40">
      <MediaImage id={mediaList[currentIndex]}/>
      </div>
    );
  }
  
  export default ImageModal;