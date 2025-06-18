import { AnimatePresence } from "framer-motion";
import { MediaItem } from "./MediaItem";
import cn from "clsx";

export function ImagePreviewGrid({ mediaIds }: { mediaIds: number[] }) {
    const total = mediaIds.length;
  
    // 1-column images are full height square; 2-column images are half height
    const gridHeightClass = total === 1 ? "h-36" : "h-36"; // same height, just changes layout
    const gridCols = total === 1 ? "grid-cols-1" : "grid-cols-2";
    const gridRows = total <= 2 ? "grid-rows-1" : "grid-rows-2";
  
    return (
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
              <MediaItem key={id} id={id} index={index} total={total} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    );
  }