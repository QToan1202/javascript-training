export default class Storage {

  /**
   * Get the value from localStorage
   * @param {String} key 
   * @returns Object
   */
  static getData(key) {
    return JSON.parse(localStorage.getItem(key)); 
  }

  /**
   * Store data in localStorage
   * @param {String} key 
   * @param {String} value 
   */
  static setData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Clear all data exist in localStorage
   */
  static clearData() {
    localStorage.clear();
  }
}