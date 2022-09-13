import User from '../models/user';
import { API_USERS } from '../utilities/constant';
import APIHelper from './apiHelpers';

export default class APIUser {
  /**
   * Get all the user in database
   * @returns Array
   */
  async getAllUser() {
    try {
      const response = await fetch(API_USERS);
      return await response.json();
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Create new account
   * @param {String} userName 
   * @param {String} password 
   * @returns Object
   */
  async createAccount(userName, password) {
    const newAccount = new User(userName, password);
    try {
      const response = await fetch(API_USERS, APIHelper.requestOptions('POST', JSON.stringify(newAccount)));
      return await response.json();
    } catch (error) {
      throw new Error(error);
    }
  }
}
