import Button from "Core/Button";
import Helper from "Service/Helper";
import { ChangeEvent, ChangeEventHandler, FC, useEffect, useState } from "react";
import Style from "Sass/Core/_pagination.module.scss";

export interface PaginationCoreProps {
  pagination:number[]
  pageOption: number[];
  arrPage:number[]
  page:number
  handleBackPage:()=>void;
  handleNextPage:()=>void;
  handleSelectPage:(val:number)=>void
  handleSelectPageOption:ChangeEventHandler
}

const PaginationCore: FC<PaginationCoreProps> = (props) => {
  const {
    page,
    arrPage,
    pageOption,
    pagination,
    handleBackPage,
    handleNextPage,
    handleSelectPage,
    handleSelectPageOption,
  } = props;
  
  return (
    <div className={Style["pagination-container"]}>
      <div className={Style["page-option-container"]}>
        <div>
          <select onChange={handleSelectPageOption} className={Style["page-select"]}>
            {pageOption.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={Style["pagination-numbers"]}>
        <Button
          isDisabled={page === pagination[0]}
          content={"<"}
          onClick={handleBackPage}
        />
        {pagination.length <= 5 &&
          pagination.map((item) => (
            <Button
              key={item}
              className={
                item === page
                  ? Style["btn-number--selected"]
                  : Style["btn-number"]
              }
              content={item}
              onClick={() => handleSelectPage(item)}
            />
          ))}
        {pagination.length > 5 && (
          <>
            <Button
              className={
                page === pagination[0]
                  ? Style["btn-number--selected"]
                  : Style["btn-number"]
              }
              content={pagination[0]}
              onClick={() => handleSelectPage(pagination[0])}
            />
            {page > pagination[0] + 2 && (
              <div className={Style["btn-number--cutted"]}>
                <span>{"..."}</span>
              </div>
            )}
            {arrPage.map((item) => (
              <Button
                key={item}
                className={
                  item === page
                    ? Style["btn-number--selected"]
                    : Style["btn-number"]
                }
                content={item}
                onClick={() => handleSelectPage(item)}
              />
            ))}
            {page < pagination[pagination.length - 1] - 2 && (
              <div className={Style["btn-number--cutted"]}>
                <span>{"..."}</span>
              </div>
            )}
            <Button
              className={
                page === pagination[pagination.length - 1]
                  ? Style["btn-number--selected"]
                  : Style["btn-number"]
              }
              content={pagination[pagination.length - 1]}
              onClick={() =>
                handleSelectPage(pagination[pagination.length - 1])
              }
            />
          </>
        )}
        <Button
          isDisabled={page === pagination[pagination.length - 1]}
          content={">"}
          onClick={handleNextPage}
        />
      </div>
    </div>
  );
};

export default PaginationCore;
