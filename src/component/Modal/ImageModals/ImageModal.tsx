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
      <div className="p-6 rounded-xl flex justify-center items-center w-full h-full">
        <div className="flex justify-center items-center">
          <MediaImage id={mediaList[currentIndex]} roundedClass="rounded-2xl"/>
        </div>
      </div>
    );
  }
  
  export default ImageModal;