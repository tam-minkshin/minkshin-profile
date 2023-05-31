import { ChangeEventHandler } from "react";
import "../../Sass/Core/_input.scss"
interface InputProps {
  label: string;
  value: string;
  onChange:ChangeEventHandler<HTMLInputElement>
}
const InputCore = (props: InputProps) => {
  const { label, value, onChange } = props;
  return (
    <div className='container'>
      <label className="label">{label}</label>
      <input className="input" value={value} onChange={onChange}/>
    </div>
  );
};
export default InputCore;
