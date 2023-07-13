import Button from "Core/Button";
import { FC, useEffect, useState } from "react";
import Style from "../../Sass/Core/_dialog.module.scss";
interface DialogProps {
  content: JSX.Element;
  isShowDialog: boolean;
  title: string;
  contentBtn: string;
  handleShow:()=>void
}

const Dialog: FC<DialogProps> = (props) => {
  const { content, isShowDialog, title, contentBtn, handleShow } = props;
  const [isShow, setShow] = useState<boolean>(false);
  useEffect(() => {
    setShow(isShowDialog);
  },[isShowDialog]);

  return (
    <>
      {isShow && (
        <>
          <div className={Style["background-padding"]}></div>
          <div className={Style["container-padding"]}>
            <div className={Style["content-box"]}>
              <div className={Style["content-dialog"]}>
                <div className={Style["header-dialog"]}>
                  <h1 className={Style['title-dialog']}>{title}</h1>
                  <div className={Style['close-btn']} onClick={handleShow}><span>X</span></div>
                </div>
                <div className="w-full flex flex-row my-7">
                  <div className="bg-gradient-to-l from-outline h-1 basis-1/2"></div>
                  <div className="bg-gradient-to-r from-outline h-1 basis-1/2"></div>
                </div>
                <div>{content}</div>
              </div>
            </div>
          </div>
        </>
      )}
      <Button content={contentBtn} onClick={handleShow} />
    </>
  );
};

export default Dialog;
