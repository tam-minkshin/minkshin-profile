import Calendar from "Core/Calendar";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
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
  defaultValue?: number;
}
interface DatePickerCoreStates {
  valueInput: string;
  valueDate: number;
  classes: string;
}
const DatePickerCore = (props: DatePickerCoreProps) => {
  const { label, name, onChange, minYear = 1900, maxYear = 2100, minDate = new Date(`${minYear}/${1}/${1}`).getTime(), maxDate = new Date(`${maxYear}/${12}/${31}`).getTime(), defaultValue } = props;
  const [state, setState] = useState<DatePickerCoreStates>({ valueInput: "", valueDate: 0, classes: `${Style["calendar-pikcer-hidden"]}` });
  const inputRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (defaultValue) {
      setState((state) => ({ ...state, ...{ valueInput: Helper.formatDate(defaultValue), valueDate: defaultValue } }));
      return;
    }
    setState((state) => ({ ...state, ...{ valueInput: Helper.formatDate(Date.now()), valueDate: Date.now() }}));
  }, [defaultValue]);
  useEffect(() => {
    window.addEventListener(
      "click",
      () => {
        setState((state) => ({ ...state, ...{ classes: `${Style["calendar-pikcer-hidden"]}` } }));
      },
      true
    );
  }, []);

  const handleChangeDate = (res: number) => {
    state.valueDate = res;
    state.valueInput = Helper.formatDate(res);
    setState({ ...state });
    onChange(name, res);
  };
  const handleClick = (e: MouseEvent) => {
    if ((e.target as Element).className === StyleCalendar["day-allowed"] || (e.target as Element).className === `${StyleCalendar["day-allowed"]} ${StyleCalendar["day-picked"]}`) {
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
  const handleInputDate = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.split("/");
    if (value[0].length === 2 && value[1].length === 2 && Number(value[0]) <= 31 && Number(value[1]) <= 12 && Number(value[2]) && value[2].length === 4 && value.findIndex((item) => item === "") === -1) {
      state.valueDate = Helper.parseTimestamp(`${value[0]}/${value[1]}/${value[2]}`);
      onChange(name, state.valueDate);
      setState({ ...state });
    }
  };
  return (
    <div className={Style["date-picker-ctn"]}>
      <div ref={inputRef} className={Style["input-picker"]} onClick={handleClick}>
        <label className={Style["label"]}>{label}</label>
        <input key={state.valueInput} placeholder="DD/MM/YYYY" className={Style["input-datepicker"]} type="text" defaultValue={state.valueInput} name={name} onChange={handleInputDate} />
        <div className={state.classes}>
          <Calendar defaultValue={state.valueDate} minYear={minYear} maxYear={maxYear} minDate={minDate} maxDate={maxDate} onPick={handleChangeDate} />
        </div>
      </div>
    </div>
  );
};

export default DatePickerCore;
