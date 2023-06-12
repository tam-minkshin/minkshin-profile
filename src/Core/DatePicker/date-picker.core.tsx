import Calendar from "Core/Calendar";
import Input from "Core/Input";
import { MouseEvent, useEffect, useRef, useState } from "react";
import Style from "Sass/Core/_date-picker.module.scss";
import StyleCalendar from "Sass/Core/_calendar.module.scss";
import Helper from "Service/Helper";

interface DatePickerCoreProps {
  label: string;
  name: string;
  onChange: (name: string, value:number) => void;
  minYear?: number;
  maxYear?: number;
  minDate?: number;
  maxDate?: number;
  defaultValue?: number | undefined;
}

const DatePickerCore = (props: DatePickerCoreProps) => {
  const { label, name, onChange, minYear = 1900, maxYear = 2100, minDate = new Date(`${minYear}/${1}/${1}`).getTime(), maxDate = new Date(`${maxYear}/${12}/${31}`).getTime(), defaultValue } = props;
  const [classes, setClass] = useState<string>(`${Style["calendar-pikcer-hidden"]}`);
  const [value, setValue] = useState<string>(Helper.formatDate(Date.now()));
  const test = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.addEventListener("click", () => setClass(`${Style["calendar-pikcer-hidden"]}`), true);
    return window.removeEventListener("click", () => setClass(`${Style["calendar-pikcer-hidden"]}`), true);
  });
  useEffect(() => {
    if (defaultValue) {
      setValue(Helper.formatDate(defaultValue));
    }
  }, [defaultValue]);
  const handleChangeDate = (value: string) => {
    setValue(Helper.formatDate(value));
    onChange(name, new Date(value).getTime());
  };
  const handleClick = (e: MouseEvent) => {
    if ((e.target as Element).className === StyleCalendar["day-allowed"]) {
      setClass(`${Style["calendar-pikcer-hidden"]}`);
      return;
    }
    setClass(`${Style["calendar-pikcer"]}`);
  };
  return (
    <div className={Style["date-picker-ctn"]}>
      <div className={Style["input-picker"]} onClick={handleClick}>
        <input type="Date" defaultValue={value} name={name} />

        <div className={classes} ref={test}>
          <Calendar defaultValue={defaultValue} minYear={minYear} maxYear={maxYear} minDate={minDate} maxDate={maxDate} onPick={handleChangeDate} />
        </div>
      </div>
    </div>
  );
};

export default DatePickerCore;
