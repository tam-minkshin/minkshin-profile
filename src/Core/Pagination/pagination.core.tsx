import Button from "Core/Button";
import Helper from "Service/Helper";
import { FC, useState } from "react";
import Style from "Sass/Core/_pagination.module.scss";

interface PaginationCoreProps {
  defaultPage?: number;
  pageOption?: number[];
}
const pagination = Helper.renderArray(51).splice(1);

const PaginationCore: FC<PaginationCoreProps> = (props) => {
  const { defaultPage = 1, pageOption = [10, 30, 50] } = props;
  const [page, setPage] = useState<number>(defaultPage);
  const [arrPage, setArrPage] = useState<number[]>([defaultPage + 1]);
  const handleArrPage = (pageNumber: number) => {
    switch (pageNumber) {
      case pagination[0]:
        setArrPage([pageNumber + 1]);
        break;
      case pagination[1]:
        setArrPage([pageNumber, pageNumber + 1]);
        break;
      case pagination[pagination.length - 1]:
        setArrPage([pageNumber - 1]);
        break;
      case pagination[pagination.length - 1] - 1:
        setArrPage([pageNumber - 1, pageNumber]);
        break;
      default:
        setArrPage([pageNumber - 1, pageNumber, pageNumber + 1]);
        break;
    }
  };
  const handleBackPage = () => {
    handleArrPage(page - 1);
    if (page > pagination[0]) setPage(page - 1);
  };
  const handleNextPage = () => {
    handleArrPage(page + 1);
    if (page < pagination[pagination.length - 1]) setPage(page + 1);
  };
  const handleSelectPage = (pageNumber: number) => {
    handleArrPage(pageNumber);
    setPage(pageNumber);
  };
  return (
    <div className={Style["pagination-container"]}>
      <div className="flex justify-center items-center mr-1">
        <div>
          <select className="text-dark border-r-8">
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
        {pagination.length <= 10 &&
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
        {pagination.length > 10 && (
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
