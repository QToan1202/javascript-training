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
      this.users = await this.APIUser.get();
    } catch (error) {
      this.showError('Can\'t get users list, check your internet');
    }
  }

  /**
   * Find user account
   * @returns Boolean
   */
  login(userName, password) {
    try {
      const loginUser = this.users.find((user) => user.userName === userName && user.password === password);

      if (loginUser) {
        Storage.setData('user', loginUser);
        return true;
      }

      return false;
    } catch (error) {
      return this.showError('Can\'t login');
    }
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
      const response = await this.APIUser.add(newAccount);

      Storage.setData('user', response);
      return true;
    } catch (error) {
      return this.showError('Error occurred in create account process');
    }
  }
}
