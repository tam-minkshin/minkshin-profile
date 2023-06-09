import { FC } from "react";

interface TranferListProps {}
const listLeft = ["A", "B", "C"];
const listRigth = ["D", "E", "G"];
const TranferList: FC<TranferListProps> = () => {
  return (
    <div className="w-full">
      <div className="flex flex-row text-light justify-evenly text-center py-4 border">
        <div className="flex flex-col basis-1/3 justify-evenly border border-outline">
          {listLeft.map((item, id) => (
            <div key={id}>{item}</div>
          ))}
        </div>
        <div className="flex flex-col basis-1/6 justify-evenly">
          <div>{">"}</div>
          <div>{">>"}</div>
          <div>{"<<"}</div>
          <div>{"<"}</div>
        </div>
        <div className="flex flex-col basis-1/3 justify-evenly border border-outline">
          {listRigth.map((item, id) => (
            <div key={id}>{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TranferList;
