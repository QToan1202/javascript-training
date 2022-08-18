import constant from './constant';

export default class APITask {
  /**
   * Create options object for request
   * @param {String} method
   * @param {*} data
   * @returns Object
   */
  requestOptions(method, data) {
    return {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  /**
   * Calling API to add new task
   * @param {String} taskName
   * @return Object
   */
  async addTask(taskName) {
    try {
      const response = await fetch(this.apiEndpoint('tasks'), this.requestOptions('POST', taskName));
      return await response.json();
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Get task form 4 API each have different state
   * @returns Array
   */
  async getTaskList() {
    try {
      const response = await Promise.all([
        fetch(this.apiEndpoint('/tasks-todo')),
        fetch(this.apiEndpoint('/tasks-in-progress')),
        fetch(this.apiEndpoint('/tasks-done')),
        fetch(this.apiEndpoint('/tasks-archived')),
      ]);
      return await Promise.all(response.map((r) => r.json()));
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Get the full path of API endpoint
   * @param {String} url
   * @returns String
   */
  apiEndpoint(url) {
    return `${constant.API_URL}${url}`;
  }
}
