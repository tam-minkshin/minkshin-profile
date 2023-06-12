import Input from "Core/Input";
import { ChangeEvent, FC } from "react";
import Style from "Sass/Core/_checkbox.module.scss";
export type TranferItem = { label: string; value: string };
type HandleSelect = (item: TranferItem, e: ChangeEvent<HTMLInputElement>) => void;
export interface TranferListProps {
  leftList: Array<TranferItem>;
  rightList: Array<TranferItem>;
  leftTemp: Array<TranferItem>;
  rightTemp: Array<TranferItem>;
  handleSelectLeftItem: HandleSelect;
  handleSelectRightItem: HandleSelect;
  handleMoveToRight: () => void;
  handleMoveToLeft: () => void;
  handleAllToRight: () => void;
  handleAllToLeft: () => void;
  handleSearch:(name:string,value:string)=>void
}

const TranferCore: FC<TranferListProps> = (props) => {
  const { leftList, rightList, leftTemp, rightTemp, handleSelectLeftItem, handleSelectRightItem, handleMoveToRight, handleMoveToLeft, handleAllToRight, handleAllToLeft, handleSearch } = props;

  return (
    <div className={Style["container-tranfer"]}>
      <div className={Style["content-tranfer"]}>
        <div className={Style["search-item"]}>
          <Input name="searchLeft" label="" onChange={handleSearch} />
        </div>
        <div className={Style["container-item"]}>
          <div className={Style["items-tranfer--box"]}>
            {leftList.map((item, id) => (
              <div key={id} className={Style["item-tranfer"]}>
                <input className={Style["tranfer-item--input"]} type="checkbox" id={item.label} value={item.value} onChange={(e: ChangeEvent<HTMLInputElement>) => handleSelectLeftItem(item, e)} checked={leftTemp.findIndex((ele) => ele === item) !== -1} />
                <label htmlFor={item.label} className={Style["tranfer-item--label"]}>
                  {item.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={Style["container-btns"]}>
        <button disabled={!(leftTemp.length > 0)} onClick={handleMoveToRight}>
          {">"}
        </button>
        <button onClick={handleAllToRight}>{"≫"}</button>
        <button onClick={handleAllToLeft}>{"≪"}</button>
        <button disabled={!(rightTemp.length > 0)} onClick={handleMoveToLeft}>
          {"<"}
        </button>
      </div>
      <div className={Style["content-tranfer"]}>
        <div className={Style["search-item"]}>
          <Input name="searchRight" label="" onChange={handleSearch} />
        </div>
        <div className={Style["container-item"]}>
          <div className={Style["items-tranfer--box"]}>
            {rightList.map((item, id) => (
              <div key={id} className={Style["item-tranfer"]}>
                <input className={Style["tranfer-item--input"]} type="checkbox" id={item.label} value={item.value} onChange={(e: ChangeEvent<HTMLInputElement>) => handleSelectRightItem(item, e)} checked={rightTemp.findIndex((ele) => ele === item) !== -1} />
                <label className={Style["tranfer-item--label"]} htmlFor={item.label}>
                  {item.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranferCore;
