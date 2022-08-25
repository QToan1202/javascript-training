import constant from './constant';

export default class APIUser {
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
}
