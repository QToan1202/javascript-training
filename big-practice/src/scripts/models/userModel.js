import APIUser from '../services/apiUser';
import User from './user';

export default class UserModel {
  constructor() {
    this.APIUser = new APIUser();
    this.users = [];
  }

  /**
   * Get all existed users
   */
  async getUsers() {
    try {
      this.users = await this.APIUser.getAllUser();
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Find user account
   * @returns Boolean
   */
  loginUser(userName, password) {
    try {
      const loginUser = this.users.find((user) => user.userName === userName && user.password === password);

      if (loginUser) {
        sessionStorage.setItem('user', JSON.stringify(loginUser));
        return true;
      }

      return false;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Create a new user if that userName not created before
   * @param {String} userName
   * @param {String} password
   * @returns Boolean
   */
  async createAccount(userName, password) {
    const duplicateName = this.users.some((user) => user.userName === userName);

    if (duplicateName) return false;
    try {
      const newAccount = new User(userName, password);
      const response = await this.APIUser.createAccount(newAccount);
      const responseJson = JSON.stringify(response);
      
      sessionStorage.setItem('user', responseJson);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
