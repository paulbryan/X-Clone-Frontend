import type { BackgroundType } from "../../lib/types/BackgroundType.ts";

type BackgroundSetterButtonProps = {
  color: BackgroundType;
  currentColor: BackgroundType;
  setCurrentBackground: (color: BackgroundType) => void;
};

function BackgroundSetterButton({
  color,
  currentColor,
  setCurrentBackground,
}: BackgroundSetterButtonProps) {
  return (
    <>
      {currentColor == color ? (
        <div
          style={{ backgroundColor: `${color}` }}
          className="h-10 hover:cursor-pointer w-1/2 flex justify-center items-center text-lg border rounded-xl border-(--color-main)"
        >
          <p className="text-white">Dim</p>
        </div>
      ) : (
        <div
          onClick={() => setCurrentBackground(color)}
          style={{ backgroundColor: `${color}` }}
          className="h-10 w-1/2 hover:cursor-pointer flex justify-center items-center text-lg border rounded-xl border-twitterTextAlt"
        >
          <p className="text-white">Dim</p>
        </div>
      )}
    </>
  );
}

export default BackgroundSetterButton;
