import mergeClass from "Core/MergeClass";
import React, { FormEvent, ReactNode } from "react";
import Style from "Sass/Core/_button.module.scss";

interface Buttonprops {
  content: ReactNode;
  className?: string;
  onClick: () => void;
  isDisabled?: boolean;
}
const ButtonCore = (props: Buttonprops) => {
  const { content, className = "", onClick, isDisabled = false } = props;
  const handleClick = (event: FormEvent) => {
    event.preventDefault();
    onClick();
  };
  return (
    <button
      disabled={isDisabled}
      onClick={handleClick}
      className={isDisabled ? "none" : mergeClass(Style["background--btn"], className)}>
      {content}
    </button>
  );
};
export default ButtonCore;
