import Grid from "Core/Grid";
import Helper from "Service/Helper";
import { FC } from "react";
import { VIEW_CALENDAR } from "./Calendar";

interface MonthsProps {
  currentYear: number;
  handleChangeView:(view:number,data:number)=>void
}

const Months: FC<MonthsProps> = (props) => {
  const { currentYear, handleChangeView } = props;
  const months = Helper.renderArray(12);
  return (
    <div>
      <div onClick={()=>handleChangeView(VIEW_CALENDAR.YEARS,currentYear)} className="text-center text-outline font-semibold text-lg py-3 cursor-pointer">{currentYear}</div>
      <Grid alignItems="center">
        {months.map((item, id) => (
          <Grid className="text-center cursor-pointer border-2 text-white hover:bg-outline hover:text-dark" key={id} item xs={4} >
            <div onClick={()=>handleChangeView(VIEW_CALENDAR.DAYS,item)} className="p-4">{`Tháng ${item + 1}`}</div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Months;
