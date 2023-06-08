import Grid from "Core/Grid";
import Helper from "Service/Helper";
import { FC } from "react";
import { VIEW_CALENDAR } from "./Calendar";
import Style from "Sass/Core/_calendar.module.scss";

interface MonthsProps {
  currentYear: number;
  currentMonth: number;
  handleChangeView: (view: number, data: number) => void;
  minDate?: number;
  maxDate?: number;
}

const Months: FC<MonthsProps> = (props) => {
  const { currentYear, handleChangeView, currentMonth, minDate = new Date(`${currentYear}/${1}/${1}`).getTime(), maxDate = new Date(`${currentYear}/${12}/${31}`).getTime() } = props;
  const months = Helper.renderArray(12);
  const handleRenderMonth = (item: number, id: number) => {
    const monthMaxTime = new Date(`${currentYear}/${item + 1}/${1}`).getTime();
    const monthMinTime = new Date(`${currentYear}/${item + 1}/${31}`).getTime();
    if (minDate > monthMinTime || maxDate < monthMaxTime) {
      return (
        <Grid key={id} item xs={4}>
          <div className={`${Style["month-not-allowed"]} ${item + 1 === currentMonth ? `${Style["month-picked"]}` : ""}`}>{`Tháng ${item + 1}`}</div>
        </Grid>
      );
    }
    return (
      <Grid key={id} item xs={4}>
        <div className={`${Style["month-allowed"]} ${item + 1 === currentMonth ? `${Style["month-picked"]}` : ""}`} onClick={() => handleChangeView(VIEW_CALENDAR.DAYS, item)}>{`Tháng ${item + 1}`}</div>
      </Grid>
    );
  };
  return (
    <div className={Style["months-container"]}>
      <div onClick={() => handleChangeView(VIEW_CALENDAR.YEARS, currentYear)} className={Style["month-header"]}>
        {currentYear}
      </div>
      <Grid alignItems="center">{months.map((item, id) => handleRenderMonth(item, id))}</Grid>
    </div>
  );
};

export default Months;
