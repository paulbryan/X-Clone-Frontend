import { useState } from "react";
import { useModal } from "../../../context/GlobalState/ModalProvider";
import type { ModalType } from "../../../types/ModalType";
import { MediaImage } from "../../Layout/MediaImage";
import { HeroIcon } from "../../../types/HeroIcon";

type ImageModalProps = {
    setToggle: (modalType: ModalType) => void;
    mediaId: number;
    mediaList: number[]
  };
  
  function ImageModal({ setToggle, mediaId, mediaList }: ImageModalProps) {

    const [currentIndex, setCurrentIndex] = useState(mediaList.indexOf(mediaId));

    return (
      <div className="rounded-xl relative flex justify-center items-center w-full h-full">

        {currentIndex > 0 && (
        <div onClick={() => setCurrentIndex((prev) => prev - 1)} className="absolute h-12 w-12 rounded-full hover:cursor-pointer hover:bg-(--text-main)/30 left-4 flex justify-center items-center">
          <HeroIcon iconName="ArrowLeftIcon" className="w-6 h-6 text-white"/>
        </div>
        )}

        <div className="flex justify-center items-center w-5/6 py-2 px-4">
          <MediaImage id={mediaList[currentIndex]} roundedClass="rounded-2xl"/>
        </div>

        {currentIndex < mediaList.length - 1 && (
        <div onClick={() => setCurrentIndex((prev) => prev + 1)} className="absolute h-12 w-12 rounded-full hover:cursor-pointer hover:bg-(--text-main)/30 right-4 flex justify-center items-center">
          <HeroIcon iconName="ArrowRightIcon" className="w-6 h-6 text-white"/>
        </div>
        )}
          
        </div>

    );
  }
  
  export default ImageModal;