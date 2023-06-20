import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import Style from "Sass/Core/_image.module.scss"
interface ImageCoreProps {}
enum RORATE {

}
const ImageCore: FC<ImageCoreProps> = () => {
  return (
    <>
      <div className={Style['image-container']}>
        <img src="https://picsum.photos/700/700?random=1" />
      </div>
      <div className={Style['image-menu']}>
        <div className={Style['menu-content']}>
          <FontAwesomeIcon size="xl" rotation={90} icon={icon({ name: "right-left" })} />
          <FontAwesomeIcon size="xl" icon={icon({ name: "right-left" })} />
          <FontAwesomeIcon size="xl" icon={icon({ name: "rotate-left" })} />
          <FontAwesomeIcon size="xl" icon={icon({ name: "rotate-right" })} />
          <FontAwesomeIcon size="xl" icon={icon({ name: "expand" })} />
          <FontAwesomeIcon size="xl" icon={icon({ name: "xmark" })} />
        </div>
      </div>
      <div className={Style['image-preview']}>
        <div className="flex h-full items-center justify-center opacity-1">
          <div className="w-fit">
            <img src="https://picsum.photos/700/700?random=1" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageCore;
