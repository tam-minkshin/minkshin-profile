import Grid from "Core/Grid";
import Helper from "Service/Helper";
import { FC, useEffect } from "react";
import { VIEW_CALENDAR } from "./Calendar";
import Style from "../../Sass/Core/_calendar.module.scss";
interface YearsProps {
  handleChangeView: (view: number, data: number) => void;
  minYear: number;
  maxYear: number;
  currentYear: number;
  minDate?: number;
  maxDate?: number;
}

const Years: FC<YearsProps> = (props) => {
  const { handleChangeView, minYear, maxYear, currentYear, minDate = minYear, maxDate = maxYear } = props;
  useEffect(() => {
    document.getElementById(`${Style["currentYear"]}`)?.scrollIntoView(true);
  }, []);
  const arrYear = Helper.renderArray(maxYear - minYear);
  const minDateTime = minDate === minYear ? minDate : new Date(minDate).getFullYear() ;
  const maxDateTime = maxDate === maxYear ? maxDate : new Date(maxDate).getFullYear();

  const handleRenderYear = (item: number, id: number) => {
    const year = minYear + item;
    if (minDateTime > year || maxDateTime < year) {
      return (
        <Grid key={id} item xs={3}>
          <div id={year === currentYear ? `${Style["currentYear"]}` : "year"} className={Style["year-not-allowed"]}>
            {year}
          </div>
        </Grid>
      );
    }
    return (
      <Grid key={id} item xs={3}>
        <div id={year === currentYear ? `${Style["currentYear"]}` : "year"} onClick={() => handleChangeView(VIEW_CALENDAR.MONTHS, year)} className={Style["year-allowed"]}>
          {year}
        </div>
      </Grid>
    );
  };
  return (
    <div className={Style["years-container"]}>
      <Grid>{arrYear.map((item, id) => handleRenderYear(item, id))}</Grid>
    </div>
  );
};

export default Years;
