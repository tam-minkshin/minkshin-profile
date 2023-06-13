import Calendar from "Core/Calendar";
import { MouseEvent, useEffect, useRef, useState } from "react";
import Style from "Sass/Core/_date-picker.module.scss";
import StyleCalendar from "Sass/Core/_calendar.module.scss";
import Helper from "Service/Helper";

interface DatePickerCoreProps {
  label: string;
  name: string;
  onChange: (name: string, value: number) => void;
  minYear?: number;
  maxYear?: number;
  minDate?: number;
  maxDate?: number;
  defaultValue?: number | undefined;
}
interface DatePickerCoreStates {
  value: string;
  classes: string;
  position: string;
}
const DatePickerCore = (props: DatePickerCoreProps) => {
  const { label, name, onChange, minYear = 1900, maxYear = 2100, minDate = new Date(`${minYear}/${1}/${1}`).getTime(), maxDate = new Date(`${maxYear}/${12}/${31}`).getTime(), defaultValue } = props;
  const [state, setState] = useState<DatePickerCoreStates>({ value: "", classes: `${Style["calendar-pikcer-hidden"]}`, position: "bottom" });
  const inputRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (defaultValue) {
      setState((state) => ({ ...state, ...{ value: Helper.formatDate(defaultValue) } }));
      return;
    }
    setState((state) => ({ ...state, ...{ value: Helper.formatDate(Date.now()) } }));
  }, [defaultValue]);
  useEffect(() => {
    window.addEventListener(
      "click",
      () => {
        setState((state) => ({ ...state, ...{ classes: `${Style["calendar-pikcer-hidden"]}` } }));
      },
      true
    );
    return window.removeEventListener(
      "click",
      () => {
        setState((state) => ({ ...state, ...{ classes: `${Style["calendar-pikcer-hidden"]}` } }));
      },
      true
    );
  }, []);

  const handleChangeDate = (res: string) => {
    state.value = Helper.formatDate(res);
    setState({ ...state });
    onChange(name, new Date(res).getTime());
  };
  const handleClick = (e: MouseEvent) => {
    if ((e.target as Element).className === StyleCalendar["day-allowed"] || (e.target as Element).className === `${StyleCalendar["day-allowed"]} ${StyleCalendar['day-picked']}`) {
      state.classes = `${Style["calendar-pikcer-hidden"]}`;
      setState({ ...state });
      return;
    }
    if (inputRef.current && inputRef.current?.getBoundingClientRect().y > window.innerHeight / 2) {
      state.classes = `${Style["calendar-pikcer-top"]}`;
    } else {
      state.classes = `${Style["calendar-pikcer-bottom"]}`;
    }
    setState({ ...state });
  };
  return (
    <div className={Style["date-picker-ctn"]}>
      <div ref={inputRef} className={Style["input-picker"]} onClick={handleClick}>
        <label className={Style["label"]}>{label}</label>
        <input key={state.value} disabled={true} className={Style["input-datepicker"]} type="text" defaultValue={state.value} name={name} />
        <div style={{}} className={state.classes}>
          <Calendar defaultValue={defaultValue} minYear={minYear} maxYear={maxYear} minDate={minDate} maxDate={maxDate} onPick={handleChangeDate} />
        </div>
      </div>
    </div>
  );
};

export default DatePickerCore;
