import cn from "clsx";

export function MediaImage({
  src,
  alt,
  roundedClass,
}: {
  src: string;
  alt?: string;
  roundedClass?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("w-full h-full object-cover", roundedClass)}
    />
  );
}