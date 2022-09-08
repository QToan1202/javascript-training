import User from '../models/user';
import constant from './constant';

export default class APIUser {
  /**
   * Create options object for request
   * @param {String} method
   * @param {*} data
   * @returns Object
   */
  requestOptions(method, data = null, contentType = 'application/json') {
    return {
      method,
      body: data,
      headers: {
        'Content-Type': contentType,
      },
    };
  }

  /**
   * Get all the user in database
   * @returns Array
   */
  async getAllUser() {
    try {
      const response = await fetch(`${constant.API_URL}/users`);
      return await response.json();
    } catch (error) {
      throw new Error(error);
    }
  }

  async createAccount(userName, password) {
    const newAccount = new User(userName, password);
    try {
      const response = await fetch(`${constant.API_URL}/users`, this.requestOptions('POST', JSON.stringify(newAccount)));
      return await response.json();
    } catch (error) {
      throw new Error(error);
    }
  }
}
