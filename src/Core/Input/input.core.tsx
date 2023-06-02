import { ChangeEventHandler } from "react";
import Style from "Sass/Core/_input.module.scss";
import Helper from "Service/Helper";
import { InputHookProps } from "./input.hook";
import mergeClass from "Core/MergeClass";
export interface InputProps extends Omit<InputHookProps, "onChange"> {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}
const InputCore = (props: InputProps) => {
  const { label, value, onChange, className = "", name } = props;
  // const mergeClass = () => {
  //   if (Helper.isEmpty(className)) {
  //     return Style["container-input"];
  //   }
  //   const classes = className?.split(" ");
  //   classes?.push(Style["container-input"]);
  //   return classes?.join(" ");
  // };
  return (
    <div className={mergeClass(className,Style["container-input"])}>
      <label className={Style["label"]}>{label}</label>
      {!Helper.isEmpty(value) ? <input name={name} className={Style["input"]} defaultValue={value} onChange={onChange} /> : <input name={name} className={Style["input"]} onChange={onChange} />}
    </div>
  );
};
export default InputCore;
