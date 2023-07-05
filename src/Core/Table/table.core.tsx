import Pagination from "Core/Pagination";
import { FC } from "react";

export interface TableCoreProps {
  columns: Array<{ field: string; label: string }>;
  dataList: Array<{ [name: string]: any }>;
  onChangePage: (val:number) => void;
  onChangePageOption: (val:number) => void;
  totalPage: number;
  defaultPage?: number;
  pageOption: number[];
}

const TableCore: FC<TableCoreProps> = (props) => {
  const {
    onChangePage,
    onChangePageOption,
    totalPage,
    defaultPage,
    pageOption,
    columns,
    dataList,
  } = props;
  return (
    <div className="py-2">
      <table className="w-full border">
        <thead>
          <tr className="border-b bg-white/10">
            {columns.map((item) => (
              <th className="p-2" key={item.field}>
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataList.map((item: { [name: string]: any }, id) => (
            <tr className="text-center hover:bg-white/10" key={id}>
              {columns.map((ele, eleId) => (
                <td key={eleId} className="p-2">
                  {item[ele.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalPage={totalPage}
        onChangePage={onChangePage}
        onChangePageOption={onChangePageOption}
        defaultPage={defaultPage}
        pageOption={pageOption}
      />
    </div>
  );
};

export default TableCore;
