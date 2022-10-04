import { API_USERS } from '../constants/url';
import APIHelper from './helpers';

export default class APIUser {
  /**
   * Get all the user in database
   * @returns Array
   */
  async get() {
    const response = await fetch(API_USERS);
    const result = response.json();

    return result;
  }

  /**
   * Create new account
   * @param {Object} account 
   * @returns Object
   */
  async add(account) {
    const response = await fetch(API_USERS, APIHelper.requestOptions('POST', account));
    const result = response.json();

    return result;
  }
}
