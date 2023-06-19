import { FC } from "react";

interface ImageCoreProps {}

const ImageCore: FC<ImageCoreProps> = () => {
  return (
    <>
      <div className="cursor-zoom-in">
        <img src="https://picsum.photos/200/300?random=1" />
      </div>
      <div className="absolute z-10 bg-gray-700/40 w-screen h-fit top-0 left-0">
        <div className="flex py-4">
          <div>X</div>
        </div>
      </div>
      <div className="absolute bg-black/75 w-screen h-screen top-0 left-0">
        <div className="flex h-full items-center justify-center opacity-1">
          <div className="w-fit">
            <img src="https://picsum.photos/200/300?random=1" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageCore;
