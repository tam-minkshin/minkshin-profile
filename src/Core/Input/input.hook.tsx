import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import Input from "../Input/input.core";

interface InputHookProps {
  label: string;
  defaultValue?: string | undefined;
  name: string;
  onChange: (name: string, value: string) => void;
}

const InputHook: FunctionComponent<InputHookProps> = (props) => {
  const { label, defaultValue = "", name, onChange } = props;
  const [value, setValue] = useState<string>("");
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange(name, event.target.value);
  };
  return <Input label={label} value={value} onChange={handleChange} />;
};

export default InputHook;
