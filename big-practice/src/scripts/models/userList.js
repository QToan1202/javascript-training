import ERROR_CODE from '../constants/errorCode';
import MESSAGES from '../constants/messages';
import APIUser from '../services/user';
import Storage from '../utilities/storageHelper';
import User from './user';

export default class UserList {
  constructor() {
    this.APIUser = new APIUser();
    this.users = [];
  }

  /**
   * Alert error when occurred
   * @param {Function} callback Controller.handleErrorOccurred
   */
  bindErrorOccurred(callback) {
    this.showError = callback;
  }

  /**
   * Get all existed users
   */
  async get() {
    try {
      const { status, data } = await this.APIUser.get();
      
      if (status !== 200) this.showError(ERROR_CODE[status]);
      this.users = data;
    } catch (error) {
      this.showError(MESSAGES.INTERNET);
    }
  }

  /**
   * Find user account
   * @returns Boolean
   */
  login(userName, password) {
    const loginUser = this.users.find((user) => user.userName === userName && user.password === password);

    if (loginUser) {
      Storage.setData('user', loginUser);
      return true;
    }

    return false;
  }

  /**
   * Create a new user if that userName not created before
   * @param {String} userName
   * @param {String} password
   * @returns Boolean
   */
  async add(userName, password) {
    const duplicateName = this.users.some((user) => user.userName === userName);

    if (duplicateName) return false;
    try {
      const newAccount = new User(userName, password);
      const { status, data } = await this.APIUser.add(newAccount);
      
      if (status !== 201) this.showError(ERROR_CODE[status]);
      Storage.setData('user', data);
      return true;
    } catch (error) {
      return this.showError(MESSAGES.INTERNET);
    }
  }
}
