import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import Input from "Core/Input/input.core";

export interface InputHookProps {
  label: string;
  defaultValue?: string | undefined;
  name: string;
  onChange: (name: string, value: string) => void;
  className?: string
}

const InputHook: FunctionComponent<InputHookProps> = (props) => {
  const { label, defaultValue = "", name, onChange, className } = props;
  const [value, setValue] = useState<string>("");
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange(name, event.target.value);
  };
  return <Input name={name} className={className} label={label} value={value} onChange={handleChange} />;
};

export default InputHook;
