import Helper from "Service/Helper";
const mergeClass = (className:string, classScss:string) => {
  if (Helper.isEmpty(className)) {
    return classScss;
  }
  const classes = className?.split(" ");
  classes?.push(classScss);
  return classes?.join(" ");
};
export default mergeClass;