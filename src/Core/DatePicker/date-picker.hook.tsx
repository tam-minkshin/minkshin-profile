import { FC } from "react";
import DatePicker from "Core/DatePicker";

interface DatePickerHookProps {
  label: string;
  name: string;
  onChange: () => void;
  minYear?: number;
  maxYear?: number;
  minDate?: number;
  maxDate?: number;
}

const DatePickerHook: FC<DatePickerHookProps> = (props) => {
  const { label, name, onChange, minDate = 1900, maxDate = 2100, minYear = 1990, maxYear = 2100 } = props;
  const handleChange = () => {
    // onChange;
  };
  return <DatePicker label={label} name={name} onChange={handleChange} minDate={minDate} maxDate={maxDate} minYear={minYear} maxYear={maxYear} />;
};

export default DatePickerHook;
