class Helper {
  static isEmpty(value: any) {
    try {
      if (value === "" || value === "undefined" || Object.entries(value).length === 0 || value.length === 0) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
  static renderArray(value: number) {
    return Array.from(Array(value).keys());
  }
  static formatDate(value: number) {
    try {
      const time = new Date(value);
      return `${`${time.getDate()}`.length < 2 ? `0${time.getDate()}` : `${time.getDate()}`}/${`${time.getMonth()}`.length < 2 ? `0${time.getMonth() + 1}` : `${time.getMonth() + 1}`}/${time.getFullYear()}`;
    } catch (error) {
      throw `invalid value ${value}`;
    }
  }
  static parseTimestamp(value: string) {
    try {
      const timeArr = value.split("/")
      if(Number(timeArr[0]) <= 31 && Number(timeArr[1]) <= 12 && (Number(timeArr[2]) && timeArr[2].length === 4)){
        return new Date(Number(timeArr[2]), Number(timeArr[1]) - 1, Number(timeArr[0])).getTime();
      }
      throw new Error(`invalid value ${value}`);
    } catch (error) {
      throw new Error(`invalid value ${value}`);
    }
  }
  static deepClone(data:any) {
    return JSON.parse(JSON.stringify(data))
  }
}
export default Helper;
