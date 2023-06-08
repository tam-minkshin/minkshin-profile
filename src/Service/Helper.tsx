class Helper {
  static isEmpty(value: any) {
    try {
      if (value === "" || value === "undefined" || Object.entries(value).length === 0) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
  static renderArray(value:number){
    return Array.from(Array(value).keys());
  }
  static formatDate(value:string | number){
    try {
      const time = new Date(value)
      return `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`
    } catch (error) {
      throw `invalid value ${value}`
    }
  }
}
export default Helper;
