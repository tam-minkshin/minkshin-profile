import Pagination from "Core/Pagination";
import { FC } from "react";

interface TableCoreProps {}
const columns = [
  { field: "name", label: "Họ tên" },
  { field: "dob", label: "Ngày sinh" },
  { field: "email", label: "Email" },
];
const dataList = [
  { name: "Jone Cena", dob: 899078400000, email: "jonecena@gmail.com" },
  { name: "Jone Cela", dob: 814665600000, email: "jonecela@gmail.com" },
  { name: "Jone Banana", dob: 857952000000, email: "jonebanana@gmail.com" },
];
const TableCore: FC<TableCoreProps> = () => {
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
              {columns.map((ele,eleId) => (
                <td key={eleId} className="p-2">{item[ele.field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default TableCore;
