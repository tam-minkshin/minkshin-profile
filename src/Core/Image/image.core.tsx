import { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Style from "Sass/Core/_image.module.scss";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faExpand, faRightLeft, faRotateLeft, faRotateRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import { styled } from "styled-components";
interface ImageCoreProps {
  linkImg:string
}
interface ImageCoreState {
  scaleY: number;
  scaleX: number;
  rotate: number;
  isExpand: boolean;
  isClosed: boolean;
}
const menuBar: IconProp[] = [faRightLeft, faRightLeft, faRotateLeft, faRotateRight, faExpand, faXmark];
const TransForm = styled.div<{ $scaleY: number; $scaleX: number; $rotate: number; $isExpand: boolean }>`
  width: fit-content;
  overflow: hidden;
  transform: ${(props) => `scale3d(${props.$scaleX},${props.$scaleY},1) rotate(${props.$rotate}deg)`};
  transition: 0.5s;
`;
const ImageCore: FC<ImageCoreProps> = (props) => {
  const {linkImg} = props
  const [state, setState] = useState<ImageCoreState>({ scaleY: 1, scaleX: 1, rotate: 0, isExpand: false, isClosed: true });
  const handleAction = (item: IconProp | string) => {
    switch (item) {
      case "faTopBottom":
        state.scaleY = -state.scaleY;
        break;
      case faRightLeft:
        state.scaleX = -state.scaleX;
        break;
      case faRotateLeft:
        state.rotate -= 90;
        break;
      case faRotateRight:
        state.rotate += 90;
        break;
      case faExpand:
        state.isExpand = !state.isExpand;
        break;
      case faXmark:
        state.isClosed = !state.isClosed;
        break;
    }
    setState({ ...state });
  };
  const handleReview = () => {
    state.isClosed = false;
    setState({ ...state });
  };
  return (
    <>
      <div className={Style["image-container"]} onClick={handleReview}>
        <img alt={linkImg} src={linkImg} />
      </div>
      {!state.isClosed && (
        <>
          <div className={Style["image-menu"]}>
            <div className={Style["menu-content"]}>
              {menuBar.map((item, id) => (
                <div key={id} onClick={() => handleAction(id === 0 ? "faTopBottom" : item)}>
                  <FontAwesomeIcon rotation={id === 0 ? 90 : undefined} icon={item} />
                </div>
              ))}
            </div>
          </div>
          <div className={Style["image-preview"]}>
            <div className={Style["content-preview"]}>
              <TransForm $scaleY={state.scaleY} $scaleX={state.scaleX} $rotate={state.rotate} $isExpand={state.isExpand}>
                <img alt={linkImg} style={{height:state.isExpand ? '100vh' : 'auto'}} src={linkImg} />
              </TransForm>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ImageCore;
