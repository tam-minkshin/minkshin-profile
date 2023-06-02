import mergeClass from "Core/MergeClass";
import React, { ReactNode } from "react";
import Style from "Sass/Core/_button.module.scss";

interface Buttonprops {
  content: ReactNode;
  className: string;
}
const ButtonCore = (props: Buttonprops) => {
  const { content, className } = props;
  return <button className={mergeClass(className, Style["background--btn"])}>{content}</button>;
};
export default ButtonCore;
