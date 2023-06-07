import Calendar from "Core/Calendar";
import Input from "Core/Input";
import { useEffect, useState } from "react";
import Style from "Sass/Core/_date-picker.module.scss";

interface DatePickerCoreProps {
  label: string;
  name: string;
  onChange: (name: string, value: string) => void;
  minYear: number;
  maxYear: number;
  minDate: number;
  maxDate: number;
}

const DatePickerCore = (props:DatePickerCoreProps) => {
  const { label, name, onChange, minDate, maxDate, minYear, maxYear } = props;
  const [classes, setClass] = useState<string>("");
  useEffect(() => {
    window.addEventListener("click", () => setClass(`${Style["calendar-pikcer-hidden"]}`), true);
  });
  return (
    <div className={Style["date-picker-ctn"]}>
      <div
        className={Style["input-picker"]}
        onClick={() => {
          setClass(`${Style["calendar-pikcer"]}`);
        }}
      >
        <Input label={label} name={name} onChange={onChange} />
        <div className={classes}>
          <Calendar minYear={minYear} maxYear={maxYear} minDate={minDate} maxDate={maxDate} />
        </div>
      </div>
    </div>
  );
};

export default DatePickerCore;
