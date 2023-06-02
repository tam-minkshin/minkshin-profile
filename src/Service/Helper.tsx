class Helper {
  static isEmpty(value: any) {
    try {
      if (value === "" || value.length === 0 || value === "undefined" || Object.entries(value).length === 0) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}
export default Helper;
