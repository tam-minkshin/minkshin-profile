import Grid from "Core/Grid";
import Helper from "Service/Helper";
import { FC } from "react";
import { VIEW_CALENDAR } from "./Calendar";

interface YearsProps {
  handleChangeView: (view: number, data: number) => void;
}

const Years: FC<YearsProps> = (props) => {
  const { handleChangeView } = props;
  const minYear = 1900;
  const maxYear = 2200;
  const arrYear = Helper.renderArray(maxYear - minYear);
  return (
    <div className="max-h-96 overflow-y-scroll overflow-x-hidden">
      <Grid>
        {arrYear.map((item) => (
          <Grid item xs={3}>
            <div onClick={() => handleChangeView(VIEW_CALENDAR.MONTHS, minYear + item)} className="text-center cursor-pointer border-2 text-white hover:bg-outline hover:text-dark p-4">
              {minYear + item}
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Years;
