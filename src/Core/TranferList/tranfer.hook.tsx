import { ChangeEvent, FC, useState } from "react";
import TranferCore, { TranferItem } from "./tranfer.core";
import Helper from "Service/Helper";
type TranferList = Array<TranferItem>;
interface TranferHookProps {
  leftList: TranferList;
  rightList: TranferList;
  onChange: <L>(left: L, right: L) => void;
}
interface TranferHookState {
  dataLeft: TranferList;
  dataRight: TranferList;
  leftList: TranferList;
  tempLeft: TranferList;
  rightList: TranferList;
  tempRigth: TranferList;
}
const TranferHook: FC<TranferHookProps> = (props) => {
  const { leftList, rightList, onChange } = props;
  const [state, setState] = useState<TranferHookState>({ dataLeft: leftList, dataRight: rightList, leftList: leftList, rightList: rightList, tempLeft: [], tempRigth: [] });
  const handleSelectLeftItem = (item: TranferItem, e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      state.tempLeft.push(item);
    } else {
      const index = state.tempLeft.findIndex((ele) => item === ele);
      state.tempLeft.splice(index, 1);
    }
    setState({ ...state });
  };
  const handleSelectRightItem = (item: TranferItem, e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      state.tempRigth.push(item);
    } else {
      const index = state.tempRigth.findIndex((ele) => item === ele);
      state.tempRigth.splice(index, 1);
    }
    setState({ ...state });
  };
  const handleMoveToRight = () => {
    state.tempLeft.forEach((item) => {
      state.leftList.splice(
        state.leftList.findIndex((ele) => ele === item),
        1
      );
      state.rightList.push(item);
    });
    state.tempLeft = [];
    onChange(state.leftList, state.rightList);
    setState({ ...state });
  };
  const handleMoveToLeft = () => {
    state.tempRigth.forEach((item) => {
      state.rightList.splice(
        state.rightList.findIndex((ele) => ele === item),
        1
      );
      state.leftList.push(item);
    });
    state.tempRigth = [];
    onChange(state.leftList, state.rightList);
    setState({ ...state });
  };
  const handleAllToRight = () => {
    state.rightList = [...state.rightList, ...state.leftList];
    state.leftList = [];
    state.tempRigth = [...state.tempRigth, ...state.tempLeft];
    state.tempLeft = [];
    onChange(state.leftList, state.rightList);
    setState({ ...state });
  };
  const handleAllToLeft = () => {
    state.leftList = [...state.leftList, ...state.rightList];
    state.rightList = [];
    state.tempLeft = [...state.tempLeft, ...state.tempRigth];
    state.tempRigth = [];
    onChange(state.rightList, state.leftList);
    setState({ ...state });
  };
  const handleSearch = (name: string, value: string) => {
    console.log('check value',value)
    const temp: TranferList = [];
    switch (name) {
      case "searchLeft":
        if (Helper.isEmpty(value)) {
          state.leftList = state.dataLeft;
          setState({ ...state });
          return;
        }
        state.dataLeft.map((item) => {
          if (item.label.search(value) !== -1) {
            temp.push(item);
          }
        });
        state.leftList = Helper.isEmpty(temp) ? [] : temp;
        break;
      case "searchRight":
        if (Helper.isEmpty(value)) {
          state.rightList = state.dataRight;
          setState({ ...state });
          return;
        }
        state.dataRight.map((item) => {
          if (item.label.search(value) !== -1) {
            temp.push(item);
          }
        });
        state.rightList = Helper.isEmpty(temp) ? [] : temp;
        break;
      default:
        throw `invalid name search TranferList ${name}`;
    }
    setState({ ...state });
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
