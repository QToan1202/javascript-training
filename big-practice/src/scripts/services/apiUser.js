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
   * @param {Object} account 
   * @returns Object
   */
  async createAccount(account) {
    try {
      const response = await fetch(API_USERS, APIHelper.requestOptions('POST', account));
      return await response.json();
    } catch (error) {
      throw new Error(error);
    }
  }
}
