import { usePostMedia } from "../../hooks/queries/UsePostMedia";
import { motion } from "framer-motion";
import { MediaImage } from "./MediaImage";

type MediaItemProps = {
  id: number;
  index: number;
  total: number;
  handleClick?: (id: number) => void;
}

export function MediaItem({ id, index, total, handleClick }: MediaItemProps) {

  const roundedClass =
    total === 1
      ? "rounded-2xl"
      : total === 2
      ? ["rounded-l-2xl", "rounded-r-2xl"][index]
      : total === 3
      ? ["row-span-2 rounded-l-2xl", "rounded-tr-2xl", "rounded-br-2xl"][index]
      : ["rounded-tl-2xl", "rounded-tr-2xl", "rounded-bl-2xl", "rounded-br-2xl"][index];

  return (
    <motion.div
      onClick={() => handleClick ? handleClick(id) : null}
      layout
      key={id}
      className="relative w-full h-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ duration: 0.25 }}
    >
      <MediaImage id={id} roundedClass={roundedClass} />
    </motion.div>
  );
}