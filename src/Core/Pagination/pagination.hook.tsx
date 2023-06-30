import { ChangeEvent, FC, useEffect, useState } from "react";
import PaginationCore, { PaginationCoreProps } from "./pagination.core";
import Helper from "Service/Helper";

interface PaginationHookProps {
  onChangePage: (val: number) => void;
  onChangePageOption: (val: number) => void;
  defaultPage?: number;
  totalPage: number;
  pageOption: number[];
}

const PaginationHook: FC<PaginationHookProps> = (props) => {
  const {
    defaultPage = 1,
    pageOption = [10, 30, 50],
    totalPage,
    onChangePage,
    onChangePageOption,
  } = props;
  const pagination = Helper.renderArray(totalPage + 1).splice(1);
  const [page, setPage] = useState<number>(defaultPage);
  const [arrPage, setArrPage] = useState<number[]>([defaultPage + 1]);
  useEffect(() => {
    if (page > totalPage) {
      setPage(1);
    }
  }, [totalPage]);
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
    if (page > pagination[0]) {
      handleArrPage(page - 1);
      setPage(page - 1);
      onChangePage && onChangePage(page - 1);
    }
  };
  const handleNextPage = () => {
    if (page < pagination[pagination.length - 1]) {
      setPage(page + 1);
      handleArrPage(page + 1);
      onChangePage && onChangePage(page + 1);
    }
  };
  const handleSelectPage = (pageNumber: number) => {
    handleArrPage(pageNumber);
    setPage(pageNumber);
    onChangePage && onChangePage(pageNumber);
  };
  const handleSelectPageOption = (e: ChangeEvent<HTMLSelectElement>) => {
    onChangePageOption && onChangePageOption(Number(e.target.value));
  };
  return (
    <PaginationCore
      pagination={pagination}
      arrPage={arrPage}
      page={page}
      pageOption={pageOption}
      handleSelectPageOption={handleSelectPageOption}
      handleSelectPage={handleSelectPage}
      handleNextPage={handleNextPage}
      handleBackPage={handleBackPage}
    />
  );
};

export default PaginationHook;
