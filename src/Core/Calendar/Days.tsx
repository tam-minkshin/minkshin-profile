import Button from "Core/Button";
import Grid from "Core/Grid";
import { FC } from "react";
import Style from "Sass/Core/_calendar.module.scss";
import { CalendarType, VIEW_CALENDAR } from "./Calendar";
import Helper from "Service/Helper";
import mergeClass from "Core/MergeClass";

interface DaysProps extends CalendarType {
  handleBackMonth: () => void;
  handleNextMonth: () => void;
  handlePickDate: (day: number) => void;
  handleChangeView: (view: number, data: number) => void;
  minDate?: number;
  maxDate?: number;
  maxYear: number;
}

const Days: FC<DaysProps> = (props) => {
  const { currentMonth, currentYear, currentDay, handleNextMonth, handleBackMonth, handlePickDate, handleChangeView, minDate = 0, maxYear, maxDate = new Date(maxYear, 12, 31).getTime() } = props;
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth - 1, 0).getDate();
  const handleRenderDay = (week: number, day: number, date: number, lastWeek: number) => {
    const current = new Date(`${currentYear}/${currentMonth}/${day + 1}`).getTime();
    if ((week === 0 && day > 7) || ((week + 1 === lastWeek || week + 1 === lastWeek - 1) && day < 14) || minDate > current || maxDate < current) {
      return (
        <td className={Style["day-not-allowed"]} key={`${week}${date}`}>
          {day + 1}
        </td>
      );
    }
    return (
      <td onClick={() => handlePickDate(day)} className={`${day + 1 === currentDay ? mergeClass(Style["day-allowed"], Style["day-picked"]) : Style["day-allowed"]}`} key={`${week}${date}`}>
        {day + 1}
      </td>
    );
  };

  const handleFirstWeek = () => {
    const firstDay: number = new Date(`${currentYear}-${currentMonth}-1`).getDay();
    switch (firstDay) {
      case 0:
        return Helper.renderArray(daysInPrevMonth).slice(daysInPrevMonth - (firstDay + 2));
      default:
        return Helper.renderArray(daysInPrevMonth).slice(daysInPrevMonth - (firstDay - 1));
    }
  };
  const handleLastWeek = () => {
    const lastDay: number = new Date(`${currentYear}-${currentMonth}-${daysInMonth}`).getDay();
    switch (lastDay) {
      case 0:
      case 1:
        return Helper.renderArray(1 - lastDay + 7);
      default:
        return Helper.renderArray(6 - lastDay + 9);
    }
  };
  const handleDays = () => {
    const firstWeek = handleFirstWeek();
    const lastWeek = handleLastWeek();
    let days: number[][] = [];
    let week: number[] = [];
    [...firstWeek, ...Helper.renderArray(daysInMonth), ...lastWeek].forEach((day, id) => {
      week.push(day);
      if ((id + 1) % 7 === 0) {
        days.push(week);
        week = [];
      }
    });
    return days.map((tr, week) => <tr key={week}>{tr.map((day, date) => handleRenderDay(week, day, date, days.length))}</tr>);
  };
  return (
    <table>
      <caption className={Style["header-tb"]}>
        <Grid alignItems="center">
          <Grid item xs={3}>
            <Button content={"<"} onClick={handleBackMonth} />
          </Grid>
          <Grid item xs={6}>
            <div className="cursor-pointer" onClick={() => handleChangeView(VIEW_CALENDAR.YEARS, currentDay)}>{`${currentMonth}/${currentYear}`}</div>
          </Grid>
          <Grid item xs={3}>
            <Button content={">"} onClick={handleNextMonth} />
          </Grid>
        </Grid>
      </caption>
      <thead>
        <tr>
          {Helper.renderArray(7).map((item) => (
            <th key={item}>{item !== 6 ? `T${item + 2}` : "CN"}</th>
          ))}
        </tr>
      </thead>
      <tbody>{handleDays()}</tbody>
    </table>
  );
};

export default Days;
