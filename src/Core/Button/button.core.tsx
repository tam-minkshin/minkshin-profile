import mergeClass from "Core/MergeClass";
import React, { FormEvent, ReactNode } from "react";
import Style from "Sass/Core/_button.module.scss";

interface Buttonprops {
  content: ReactNode;
  className?: string;
  onClick: ()=>void
}
const ButtonCore = (props: Buttonprops) => {
  const { content, className = "", onClick } = props;
  const handleClick = (event:FormEvent)=>{
    event.preventDefault()
    onClick()
  }
  return <button onClick={handleClick} className={mergeClass(className, Style["background--btn"])}>{content}</button>;
};
export default ButtonCore;
