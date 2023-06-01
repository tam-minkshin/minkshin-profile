import { ChangeEventHandler } from "react";
import Style from "Sass/Core/_input.module.scss";
import Helper from "Service/Helper";
interface InputProps {
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}
const InputCore = (props: InputProps) => {
  const { label, value, onChange } = props;
  return (
    <div className={Style['container-input']}>
      <label className={Style['label']}>{label}</label>
      {!Helper.isEmpty(value) ? <input className={Style['input']} defaultValue={value} onChange={onChange} /> : <input className={Style['input']} onChange={onChange} />}
    </div>
  );
};
export default InputCore;
