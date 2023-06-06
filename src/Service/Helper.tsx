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
}
export default Helper;
