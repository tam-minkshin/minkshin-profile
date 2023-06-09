import { ChangeEventHandler } from "react";
import Style from "Sass/Core/_input.module.scss";
import Helper from "Service/Helper";
import { InputHookProps } from "./input.hook";
import mergeClass from "Core/MergeClass";
export interface InputProps extends Omit<InputHookProps, "onChange"> {
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
}
const InputCore = (props: InputProps) => {
  const { label, value, onChange, className = "", name, type, disabled } = props;

  return (
    <div className={mergeClass(className, Style["container-input"])}>
      <label className={Style["label"]}>{label}</label>
      {!Helper.isEmpty(value) ? (
        <input type={type} name={name} className={Style["input"]} defaultValue={value} onChange={onChange} />
      ) : (
        <input type={type} name={name} className={Style["input"]} onChange={onChange} />
      )}
    </div>
  );
};
export default InputCore;
