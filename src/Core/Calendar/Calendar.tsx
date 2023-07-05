import { FC, useEffect, useState } from "react";
import Style from "Sass/Core/_calendar.module.scss";
import Days from "./Days";
import Months from "./Months";
import Years from "./Years";
import Helper from "Service/Helper";
export enum VIEW_CALENDAR {
  DAYS,
  MONTHS,
  YEARS,
}
interface CalendarProps {
  minYear: number;
  maxYear: number;
  minDate?: number;
  maxDate?: number;
  onPick: (value: number) => void;
  defaultValue?: number;
}

export interface CalendarType {
  currentMonth: number;
  currentYear: number;
  currentDay: number;
}
interface CalendarState extends CalendarType {
  view: number;
}

const Calendar: FC<CalendarProps> = (props) => {
  const current = new Date();
  const [state, setState] = useState<CalendarState>({ currentMonth: current.getMonth() + 1, currentYear: current.getFullYear(), currentDay: current.getDate(), view: VIEW_CALENDAR.DAYS });
  const { currentMonth, currentYear, currentDay } = state;
  const { minYear, maxYear, minDate, maxDate, onPick, defaultValue } = props;
  useEffect(() => {
    if (defaultValue) {
      const time = new Date(defaultValue);
      let { currentDay, currentMonth, currentYear } = state;
      currentDay = time.getDate();
      currentMonth = time.getMonth() + 1;
      currentYear = time.getFullYear();
      setState((state) => ({ ...state, currentDay, currentMonth, currentYear }));
    }
  }, [defaultValue]);
  const handleBackMonth = () => {
    let { currentMonth, currentYear } = state;
    if (currentMonth === 1) {
      currentMonth = 12;
      currentYear -= 1;
      setState((s) => ({ ...s, currentMonth, currentYear }));
      return;
    }
    currentMonth -= 1;
    setState((s) => ({ ...s, currentMonth, currentYear }));
  };
  const handleNextMonth = () => {
    let { currentMonth, currentYear } = state;
    if (currentMonth === 12) {
      currentMonth = 1;
      currentYear += 1;
      setState((s) => ({ ...s, currentMonth, currentYear }));
      return;
    }
    currentMonth += 1;
    setState((s) => ({ ...s, currentMonth, currentYear }));
  };
  const handlePickDate = (day: number) => {
    let { currentDay } = state;
    currentDay = day + 1;
    setState((s) => ({ ...s, currentDay }));
    onPick(Helper.parseTimestamp(`${day + 1}/${currentMonth}/${currentYear}`));
  };
  const handleChangeView = (viewPick: number, data: number) => {
    let { currentMonth, currentYear, view } = state;
    switch (viewPick) {
      case VIEW_CALENDAR.DAYS:
        currentMonth = data + 1;
        break;
      case VIEW_CALENDAR.MONTHS:
        currentYear = data;
    }
    view = viewPick;
    setState((s) => ({ ...s, currentMonth, currentYear, view }));
  };
  return (
    <div className={Style["calendar-container"]}>
      {state.view === VIEW_CALENDAR.DAYS && (
        <div className={Style["content-animation"]}>
          <Days
            currentDay={currentDay}
            currentYear={currentYear}
            currentMonth={currentMonth}
            minDate={minDate}
            maxDate={maxDate}
            handleBackMonth={handleBackMonth}
            handleNextMonth={handleNextMonth}
            handlePickDate={handlePickDate}
            handleChangeView={handleChangeView}
            maxYear={maxYear}
          />
        </div>
      )}
      {state.view === VIEW_CALENDAR.MONTHS && (
        <div className={Style["content-animation"]}>
          <Months currentYear={currentYear} currentMonth={currentMonth} minDate={minDate} maxDate={maxDate} handleChangeView={handleChangeView} />
        </div>
      )}
      {state.view === VIEW_CALENDAR.YEARS && (
        <div className={Style["content-animation"]}>
          <Years currentYear={currentYear} minYear={minYear} maxYear={maxYear} minDate={minDate} maxDate={maxDate} handleChangeView={handleChangeView} />
        </div>
      )}
    </div>
  );
};

export default Calendar;
