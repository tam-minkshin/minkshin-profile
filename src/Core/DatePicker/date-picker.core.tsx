import Calendar from "Core/Calendar";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import Style from "../../Sass/Core/_date-picker.module.scss";
import StyleCalendar from "../../Sass/Core/_calendar.module.scss";
import Helper from "Service/Helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
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
  const [state, setState] = useState<DatePickerCoreStates>({
    valueInput: "",
    valueDate: 0,
    classes: `${Style["calendar-pikcer-hidden"]}`,
  });
  const inputRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let { valueDate, valueInput } = state;
    if (defaultValue) {
      valueInput = Helper.formatDate(defaultValue);
      valueDate = defaultValue;
      setState((state) => ({ ...state, valueDate, valueInput }));
      return;
    }
    valueInput = Helper.formatDate(Date.now());
    valueDate = Date.now();
    setState((state) => ({ ...state, valueDate, valueInput }));
  }, [defaultValue]);
  useEffect(() => {
    window.addEventListener("click", (ev: globalThis.MouseEvent) => {
      const ele = calendarRef.current?.getBoundingClientRect();
      const click = ev.target as Element;
      const isCalendarClicked = ele ? ev.x < ele.right && ev.x > ele.left && ev.y < ele.bottom && ev.y > ele.top : false;
      if (!isCalendarClicked && click.className !== Style["input-datepicker"]) {
        let { classes } = state;
        classes = `${Style["calendar-pikcer-hidden"]}`;
        setState((s) => ({ ...s, classes }));
      }
    });
  }, []);

  const handleChangeDate = (res: number) => {
    let { valueDate, valueInput } = state;
    valueDate = res;
    valueInput = Helper.formatDate(res);
    setState((s) => ({ ...s, valueDate, valueInput }));
    onChange(name, res);
  };
  const handleClick = (e: MouseEvent) => {
    let { classes } = state;
    if ((e.target as Element).className === StyleCalendar["day-allowed"] || (e.target as Element).className === `${StyleCalendar["day-allowed"]} ${StyleCalendar["day-picked"]}`) {
      classes = `${Style["calendar-pikcer-hidden"]}`;
      setState((s) => ({ ...s, classes }));
      return;
    }
    if (inputRef.current && inputRef.current?.getBoundingClientRect().y > window.innerHeight / 2) {
      classes = `${Style["calendar-pikcer-top"]}`;
    } else {
      classes = `${Style["calendar-pikcer-bottom"]}`;
    }
    setState((s) => ({ ...s, classes }));
  };
  const handleInputDate = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.split("/");
    let { valueDate } = state;
    if (
      value[0].length === 2 &&
      value[1].length === 2 &&
      Number(value[0]) <= 31 &&
      Number(value[1]) <= 12 &&
      Number(value[2]) &&
      value[2].length === 4 &&
      value.findIndex((item) => item === "") === -1
    ) {
      valueDate = Helper.parseTimestamp(`${value[0]}/${value[1]}/${value[2]}`);
      onChange(name, valueDate);
      setState((s) => ({ ...s, valueDate }));
    }
  };
  return (
    <div className={Style["date-picker-ctn"]}>
      <div ref={inputRef} className={Style["input-picker"]} onClick={handleClick}>
        <label className={Style["label"]}>{label}</label>
        <input key={state.valueInput} placeholder="DD/MM/YYYY" className={Style["input-datepicker"]} type="text" defaultValue={state.valueInput} name={name} onChange={handleInputDate} />
        <div className={Style["calendar-icon"]}>
          <FontAwesomeIcon icon={icon({ name: "calendar", style: "regular" })} />
        </div>
        <div ref={calendarRef} className={state.classes}>
          <Calendar defaultValue={state.valueDate} minYear={minYear} maxYear={maxYear} minDate={minDate} maxDate={maxDate} onPick={handleChangeDate} />
        </div>
      </div>
    </div>
  );
};

export default DatePickerCore;
