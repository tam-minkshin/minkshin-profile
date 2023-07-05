import { FC, useEffect, useState } from "react";
import TableCore from "./table.core";
import Helper from "Service/Helper";
interface TableHookProps {
  isAutoPagin?: boolean;
  totalPage?: number;
  columns: Array<{ field: string; label: string }>;
  dataList: Array<{ [name: string]: any }>;
  onChangeTable?: (val: { from: number; limit: number }) => void;
  defaultPage?: number;
  pageOption?: number[];
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
    defaultPage,
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
      let { from, limit, paginList } = pagin;
      const totalItem =
        dataList.length % limit > 0
          ? Math.floor(dataList.length / limit) + 1
          : dataList.length / limit;
      paginList = Helper.deepClone(dataList).splice(from, limit);
      setPagin((p) => ({ ...p, paginList }));
      setTotal(totalItem);
    }
  }, [isAutoPagin, dataList]);
  const handleChangePage = (page: number) => {
    let { from, limit, paginList } = pagin;
    from = (page - 1) * limit;
    paginList = Helper.deepClone(dataList).splice(from, pagin.limit);
    setPagin((p) => ({ ...p, from, paginList }));
    onChangeTable && onChangeTable({ from: from, limit: pagin.limit });
  };
  const handleChangePageOption = (option: number) => {
    let totalPage = 0;
    let { from, limit, paginList } = pagin;
    totalPage =
      dataList.length % option > 0
        ? Math.floor(dataList.length / option) + 1
        : dataList.length / option;
    const currentPage = from / limit + 1;
    from = currentPage > totalPage ? 0 : currentPage * option;
    limit = option;
    paginList = Helper.deepClone(dataList).splice(from, option);
    setTotal(totalPage);
    setPagin((p) => ({ ...p, from, limit, paginList }));
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
