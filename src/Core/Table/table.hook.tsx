import { FC, useEffect, useState } from "react";
import TableCore, { TableCoreProps } from "./table.core";
import Helper from "Service/Helper";
interface TableHookProps {
  isAutoPagin?: boolean;
  totalPage?: number;
  columns: Array<{ field: string; label: string }>;
  dataList: Array<{ [name: string]: any }>;
  onChangeTable?: (val: { from: number; limit: number }) => void;
  defaultPage?:number
  pageOption?:number[]
}
interface TableHookState {
  from: number;
  limit: number;
  paginList: Array<{ [name: string]: any }>;
}
const TableHook: FC<TableHookProps> = (props) => {
  const {
    totalPage = 0,
    columns,
    dataList,
    defaultPage = 0,
    pageOption = [10, 30, 50],
    onChangeTable,
    isAutoPagin = false,
  } = props;
  const [total, setTotal] = useState<number>(0);
  const [pagin, setPagin] = useState<TableHookState>({
    from: 0,
    limit: pageOption[0],
    paginList: [],
  });
  useEffect(() => {
    if (isAutoPagin) {
      const total =
        dataList.length % pageOption[0] > 0
          ? Math.floor(dataList.length / pageOption[0]) + 1
          : dataList.length / pageOption[0];
      pagin.paginList = Helper.deepClone(dataList).splice(
        pagin.from,
        pagin.limit
      );
      setPagin((state) => ({ ...state, ...pagin }));
      setTotal(total);
    }
  }, [dataList]);
  const handleChangePage = (page: number) => {
    const from = (page - 1) * pagin.limit;
    pagin.from = from;
    pagin.paginList = Helper.deepClone(dataList).splice(from, pagin.limit);
    setPagin({ ...pagin });
    onChangeTable && onChangeTable({ from: from, limit: pagin.limit });
  };
  const handleChangePageOption = (option: number) => {
    let totalPage = 0;
    totalPage =
      dataList.length % option > 0
        ? Math.floor(dataList.length / option) + 1
        : dataList.length / option;
    setTotal(totalPage);
    const currentPage = pagin.from / pagin.limit;
    const from = currentPage > totalPage ? 0 : currentPage * option;
    pagin.from = from;
    pagin.limit = option;
    pagin.paginList = Helper.deepClone(dataList).splice(from, option);
    setPagin({ ...pagin });
    onChangeTable && onChangeTable({ from: from, limit: option });
  };
  return (
    <TableCore
      totalPage={isAutoPagin ? total : totalPage}
      columns={columns}
      dataList={isAutoPagin ? pagin.paginList : dataList}
      defaultPage={defaultPage}
      pageOption={pageOption}
      onChangePage={handleChangePage}
      onChangePageOption={handleChangePageOption}
    />
  );
};

export default TableHook;
