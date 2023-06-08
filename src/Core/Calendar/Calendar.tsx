import { FC, useEffect, useState } from "react";
import Style from "Sass/Core/_calendar.module.scss";
import Days from "./Days";
import Months from "./Months";
import Years from "./Years";
export const VIEW_CALENDAR = {
  DAYS: 0,
  MONTHS: 1,
  YEARS: 2,
};
interface CalendarProps {
  minYear: number;
  maxYear: number;
  minDate?: number;
  maxDate?: number;
  onPick: (value: string) => void;
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
      state.currentDay = time.getDate();
      state.currentMonth = time.getMonth()+1;
      state.currentYear = time.getFullYear();
    }
  }, [defaultValue]);
  const handleBackMonth = () => {
    if (state.currentMonth === 1) {
      state.currentMonth = 12;
      state.currentYear -= 1;
      setState({ ...state });
      return;
    }
    state.currentMonth -= 1;
    setState({ ...state });
  };
  const handleNextMonth = () => {
    if (state.currentMonth === 12) {
      state.currentMonth = 1;
      state.currentYear += 1;
      setState({ ...state });
      return;
    }
    state.currentMonth += 1;
    setState({ ...state });
  };
  const handlePickDate = (day: number) => {
    state.currentDay = day + 1;
    setState({ ...state });
    onPick(`${currentYear}/${currentMonth}/${day + 1}`);
  };
  const handleChangeView = (view: number, data: number) => {
    switch (view) {
      case VIEW_CALENDAR.DAYS:
        state.currentMonth = data + 1;
        break;
      case VIEW_CALENDAR.MONTHS:
        state.currentYear = data;
    }
    state.view = view;
    setState({ ...state });
  };
  return (
    <div className={Style["calendar-container"]}>
      {state.view === VIEW_CALENDAR.DAYS && (
        <div className={Style["content-animation"]}>
          <Days currentDay={currentDay} currentYear={currentYear} currentMonth={currentMonth} minDate={minDate} maxDate={maxDate} handleBackMonth={handleBackMonth} handleNextMonth={handleNextMonth} handlePickDate={handlePickDate} handleChangeView={handleChangeView} maxYear={maxYear} />
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
