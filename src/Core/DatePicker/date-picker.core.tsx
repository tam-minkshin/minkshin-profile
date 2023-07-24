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
    classes: `${Style["calendar-pikcer-bottom"]}`,
  });
  const [isOpen, setOpen] = useState<boolean>(false);

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
    const detectClick = (ev: globalThis.MouseEvent) => {
      const click = ev.target as Node;
      const isDayClicked = (ev.target as HTMLTableElement).className.indexOf(`${StyleCalendar["day-allowed"]}`) !== -1 ? true : false;
      handlePositionCal();
      if (!inputRef.current?.contains(click) || isDayClicked) {
        setOpen(false);
        return;
      }
      setOpen(true);
    };
    window.addEventListener("click", detectClick);
    return () => {
      window.removeEventListener("click", detectClick);
    };
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", handlePositionCal);
    return () => {
      window.removeEventListener("scroll", handlePositionCal);
    };
  }, []);
  const handlePositionCal = () => {
    const inputHeight = inputRef.current?.getBoundingClientRect().y ?? 0;
    const calHeight = calendarRef.current?.getBoundingClientRect().height === 0 ? 363 : calendarRef.current?.getBoundingClientRect().height ?? 363;
    let { classes } = state;
    if (inputHeight < calHeight) {
      classes = `${Style["calendar-pikcer-bottom"]}`;
    } else if (inputHeight > window.innerHeight - calHeight) {
      classes = `${Style["calendar-pikcer-top"]}`;
    }
    setState((state) => ({ ...state, classes }));
  };
  const handleChangeDate = (res: number) => {
    let { valueDate, valueInput } = state;
    valueDate = res;
    valueInput = Helper.formatDate(res);
    setState((s) => ({ ...s, valueDate, valueInput }));
    onChange(name, res);
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
      <div ref={inputRef} className={Style["input-picker"]}>
        <label className={Style["label"]}>{label}</label>
        <input key={state.valueInput} placeholder="DD/MM/YYYY" className={Style["input-datepicker"]} type="text" defaultValue={state.valueInput} name={name} onChange={handleInputDate} />
        <div ref={calendarRef} className={state.classes} style={{ display: isOpen ? "unset" : "none" }}>
          <Calendar defaultValue={state.valueDate} minYear={minYear} maxYear={maxYear} minDate={minDate} maxDate={maxDate} onPick={handleChangeDate} />
        </div>
      </div>
    </div>
  );
};

export default DatePickerCore;
