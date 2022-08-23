export default class APIHelper {
  /**
   * Create options object for request
   * @param {String} method
   * @param {*} data
   * @returns Object
   */
  static requestOptions(method, data) {
    return {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
}
