class Helper {
  static isEmpty(value: any) {
    if (value === "" || value.length === 0 || value === undefined) {
      return true;
    }
    return false;
  }
}
export default Helper;
