import Button from "Core/Button";
import Input from "Core/Input";
import React, { FC, useEffect, useState } from "react";

interface DialogProps {
  content: JSX.Element;
  isShowDialog: boolean;
  handleShow:()=>void;
  title:string;
  contentBtn:string;
}

const Dialog: FC<DialogProps> = (props) => {
  const { content, isShowDialog, handleShow, title, contentBtn } = props;
  const [isShow, setShow] = useState<boolean>(false);
  useEffect(() => {
    setShow(isShowDialog);
  }, [isShowDialog]);
  return (
    <>
      {isShow && (
        <>
          <div className="w-screen h-screen bg-black absolute z-40 top-0 left-0 opacity-75"></div>
          <div className="w-screen h-screen bg-transparent absolute z-50 top-0 left-0">
            <div className="flex h-full justify-center items-center">
              <div className="w-1/2 border-2 p-7 bg-dark opacity-100">
                <h1 className="text-white">{title}</h1>
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
