export default class Parser {
  constructor(data) {
    this.data = data;
  }

  toJson() {
    const jsonObj = {};

    this.data.forEach((value, key) => {
      jsonObj[key] = value;
    })

    return jsonObj;
  }
}