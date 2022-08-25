import APIUser from '../utilities/apiUser';

export default class ModelUser {
  constructor() {
    this.APIUser = new APIUser();
  }

  /**
   * Get all existed users
   * Then find user account
   * @returns Boolean
   */
  async loginUser(userName, password) {
    try {
      const users = await this.APIUser.getAllUser();
      return users.some((user) => user.userName === userName && user.password === password);
    } catch (error) {
      throw new Error(error);
    }
  }
}
