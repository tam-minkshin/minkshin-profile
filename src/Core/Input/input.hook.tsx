import { ChangeEvent, FC, useEffect, useState } from "react";
import Input from "Core/Input/input.core";

export interface InputHookProps {
  label: string;
  defaultValue?: string;
  name: string;
  onChange: (name: string, value: string) => void;
  className?: string;
  type?: string;
}

const InputHook: FC<InputHookProps> = (props) => {
  const { label, defaultValue = "", name, onChange, className, type="text" } = props;
  const [value, setValue] = useState<string>("");
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange(name, event.target.value);
  };
  return <Input type={type} name={name} className={className} label={label} value={value} onChange={handleChange} />;
};

export default InputHook;
