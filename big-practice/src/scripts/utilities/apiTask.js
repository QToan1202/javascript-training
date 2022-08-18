import constant from './constant';
import APIHelper from './api-helpers';

export default class APITask {
  /**
   * Calling API to add new task
   * @param {String} taskName
   * @return Object
   */
  async addTask(taskName) {
    try {
      const response = await fetch(`${constant.API_URL}/tasks`, APIHelper.requestOptions('POST', taskName));
      return await response.json();
    } catch (error) {
      throw new Error(error);
    }
  }
}
