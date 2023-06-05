import { FC } from "react";

interface CalendarProps {}

const Calendar: FC<CalendarProps> = () => {
  const daysInMonth = new Date(2023, 6, 0).getDate();
  const daysInPrevMonth = new Date(2023, 5, 0).getDate();
  const daysInNextMonth = new Date(2023, 7, 0).getDate();
  const renderArr = (value: number) => {
    console.log("check arrDays", Array.from(Array(value).keys()));
    return Array.from(Array(value).keys());
  };
  const handleFirstWeek = () => {
    const firstDay: number = new Date(2023, 6, 0).getDay();
    switch (firstDay) {
      case 0:
      case 1:
        return renderArr(daysInPrevMonth).slice(daysInPrevMonth - (firstDay + 5));
      default:
        return renderArr(daysInPrevMonth).slice(daysInPrevMonth - (firstDay - 2));
    }
  };
  const handleLastWeek = () => {
    const lastDay: number = new Date(2023, 6, daysInMonth - 1).getDay();
    switch (lastDay) {
      case 0:
      case 1:
        return renderArr(1 - lastDay + 7);
      default:
        return renderArr(6 - lastDay + 9);
    }
  };
  const handleDays = () => {
    const firstWeek = handleFirstWeek();
    const lastWeek = handleLastWeek();
    let days: number[][] = [];
    let week: number[] = [];
    [...firstWeek, ...renderArr(daysInMonth), ...lastWeek].forEach((day, id) => {
      week.push(day);
      if ((id + 1) % 7 === 0) {
        days.push(week);
        week = [];
      }
    });
    return days.map((tr,week) => (
      <tr key={week}>
        {tr.map((td,day) => (
          <td className="text-center" key={`${week}${day}`}>{td + 1}</td>
        ))}
      </tr>
    ));
  };
  return (
    <table className="text-white w-1/2 border-2">
      <thead>
        <tr>
          {renderArr(7).map((item) => (
            <th key={item}>{item !== 6 ? `T${item + 2}` : "CN"}</th>
          ))}
        </tr>
      </thead>
      <tbody>{handleDays()}</tbody>
    </table>
  );
};

export default Calendar;
