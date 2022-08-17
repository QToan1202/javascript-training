import constant from './constant';

export default class APITask {
  /**
   * Calling API to add new task
   * @param {String} taskName
   * @return Object
   */
  async addTask(taskName) {
    const options = {
      method: 'POST',
      body: JSON.stringify(taskName),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await fetch(`${constant.API_URL}/tasks`, options);
      return await response.json();
    } catch (error) {
      throw new Error(error);
    }
  }
}
