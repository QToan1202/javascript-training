export default class Session {
  static getData(key) {
    return JSON.parse(sessionStorage.getItem(key)); 
  }

  static setData(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  static clearData() {
    sessionStorage.clear();
  }
}