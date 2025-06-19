import { AnimatePresence } from "framer-motion";
import { MediaItem } from "./MediaItem";
import cn from "clsx";
import { useModal } from "../../context/GlobalState/ModalProvider";

type ImagePreviewGridProps = {
  mediaIds: number[];
  postId?: number;
}

export function ImagePreviewGrid({ mediaIds, postId }: ImagePreviewGridProps) {
    const total = mediaIds.length;

    const {setModalData, setModalType} = useModal();

    function handlePostClick (id: number) {
      setModalData({mainId: id, auxiliaryId: mediaIds });
      setModalType("imagepreview")

    }
  
    const gridHeightClass = total === 1 ? "h-36" : "h-36";
    const gridCols = total === 1 ? "grid-cols-1" : "grid-cols-2";
    const gridRows = total <= 2 ? "grid-rows-1" : "grid-rows-2";
  

    return (
      <>
      <div className={cn("w-full my-2 max-w-[400px]", gridHeightClass)}>
        <div
          className={cn(
            "grid w-full h-full gap-2 overflow-hidden rounded-2xl",
            gridCols,
            gridRows
          )}
        >
          <AnimatePresence mode="popLayout">
            {mediaIds.map((id, index) => (
              <MediaItem key={id} id={id} index={index} total={total} handleClick={handlePostClick} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    

      </>
    );
  }