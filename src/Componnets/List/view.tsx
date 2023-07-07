import Table from "Core/Table";

const View = (props: any) => {
  const column: Array<{ field: string; label: string }> = [
    { field: "name", label: "Họ tên" },
    { field: "dob", label: "Ngày sinh" },
    { field: "email", label: "Email" },
  ];
  const dataList: [] = [];
  return <Table columns={column} dataList={dataList} />;
};
export default View
