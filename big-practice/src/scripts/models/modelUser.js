import APIUser from '../utilities/apiUser';

export default class ModelUser {
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
}
