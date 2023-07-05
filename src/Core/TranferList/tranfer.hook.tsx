import { ChangeEvent, FC, useState } from "react";
import TranferCore, { TranferItem } from "./tranfer.core";
import Helper from "Service/Helper";
type TranferList = Array<TranferItem>;
interface TranferHookProps {
  dataLeft: TranferList;
  dataRight: TranferList;
  onChange: <L>(left: L, right: L) => void;
}
interface TranferHookState {
  leftList: TranferList;
  tempLeft: TranferList;
  rightList: TranferList;
  tempRigth: TranferList;
}
const TranferHook: FC<TranferHookProps> = (props) => {
  const { dataLeft, dataRight, onChange } = props;
  const [state, setState] = useState<TranferHookState>({ leftList: dataLeft, rightList: dataRight, tempLeft: [], tempRigth: [] });
  const handleSelectLeftItem = (item: TranferItem, e: ChangeEvent<HTMLInputElement>) => {
    let { tempLeft } = state;
    if (e.target.checked) {
      tempLeft.push(item);
    } else {
      const index = tempLeft.findIndex((ele) => item === ele);
      tempLeft.splice(index, 1);
    }
    setState((s) => ({ ...s, tempLeft }));
  };
  const handleSelectRightItem = (item: TranferItem, e: ChangeEvent<HTMLInputElement>) => {
    let { tempRigth } = state;
    if (e.target.checked) {
      tempRigth.push(item);
    } else {
      const index = tempRigth.findIndex((ele) => item === ele);
      tempRigth.splice(index, 1);
    }
    setState((s) => ({ ...s, tempRigth }));
  };
  const handleMoveToRight = () => {
    let { tempLeft, leftList, rightList } = state;
    tempLeft.forEach((item) => {
      leftList.splice(
        leftList.findIndex((ele) => ele === item),
        1
      );
      rightList.push(item);
    });
    tempLeft = [];
    onChange(leftList, rightList);
    setState((s) => ({ ...s, leftList, rightList, tempLeft }));
  };
  const handleMoveToLeft = () => {
    let { tempRigth, leftList, rightList } = state;
    tempRigth.forEach((item) => {
      rightList.splice(
        rightList.findIndex((ele) => ele === item),
        1
      );
      leftList.push(item);
    });
    tempRigth = [];
    onChange(leftList, rightList);
    setState((s) => ({ ...s, leftList, rightList, tempRigth }));
  };
  const handleAllToRight = () => {
    let { tempRigth, tempLeft, leftList, rightList } = state;
    rightList = [...rightList, ...leftList];
    leftList = [];
    tempRigth = [...tempRigth, ...tempLeft];
    tempLeft = [];
    onChange(leftList, rightList);
    setState((s) => ({ ...s, leftList, rightList, tempRigth, tempLeft }));
  };
  const handleAllToLeft = () => {
    let { tempRigth, tempLeft, leftList, rightList } = state;
    leftList = [...leftList, ...rightList];
    rightList = [];
    tempLeft = [...tempLeft, ...tempRigth];
    tempRigth = [];
    onChange(leftList, rightList);
    setState((s) => ({ ...s, leftList, rightList, tempRigth, tempLeft }));
  };
  const handleSearch = (name: string, value: string) => {
    const temp: TranferList = [];
    let { leftList, rightList } = state;
    switch (name) {
      case "searchLeft":
        if (Helper.isEmpty(value)) {
          leftList = dataLeft;
          setState({ ...state });
          return;
        }
        dataLeft.forEach((item) => {
          if (item.label.toUpperCase().search(value.toUpperCase()) !== -1) {
            temp.push(item);
          }
          return temp;
        });
        leftList = Helper.isEmpty(temp) ? [] : temp;
        break;
      case "searchRight":
        if (Helper.isEmpty(value)) {
          rightList = dataRight;
          setState({ ...state });
          return;
        }
        dataRight.forEach((item) => {
          if (item.label.toUpperCase().search(value.toUpperCase()) !== -1) {
            temp.push(item);
          }
          return temp;
        });
        rightList = Helper.isEmpty(temp) ? [] : temp;
        break;
    }
    setState((s) => ({ ...s, leftList, rightList }));
  };
  return (
    <TranferCore
      leftTemp={state.tempLeft}
      rightTemp={state.tempRigth}
      leftList={state.leftList}
      rightList={state.rightList}
      handleSelectLeftItem={handleSelectLeftItem}
      handleSelectRightItem={handleSelectRightItem}
      handleMoveToRight={handleMoveToRight}
      handleMoveToLeft={handleMoveToLeft}
      handleAllToRight={handleAllToRight}
      handleAllToLeft={handleAllToLeft}
      handleSearch={handleSearch}
    />
  );
};

export default TranferHook;
