import { API_USERS } from '../utilities/constant';
import APIHelper from './apiHelpers';

export default class APIUser {
  /**
   * Get all the user in database
   * @returns Array
   */
  async getAllUser() {
    const response = await fetch(API_USERS);
    const result = await response.json();

    return result;
  }

  /**
   * Create new account
   * @param {Object} account 
   * @returns Object
   */
  async createAccount(account) {
    const response = await fetch(API_USERS, APIHelper.requestOptions('POST', account));
    const result = await response.json();

    return result;
  }
}
