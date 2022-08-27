import APIHelper from './api-helpers';

export default class APITask {
  /**
   * Calling API to add new task
   * @param {String} taskName
   * @return Object
   */
  async addTask(taskName) {
    try {
      const response = await fetch(APIHelper.apiEndpoint('/tasks'), APIHelper.requestOptions('POST', taskName));
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
        fetch(APIHelper.apiEndpoint('/tasks-todo')),
        fetch(APIHelper.apiEndpoint('/tasks-in-progress')),
        fetch(APIHelper.apiEndpoint('/tasks-done')),
        fetch(APIHelper.apiEndpoint('/tasks-archived')),
      ]);
      return await Promise.all(response.map((r) => r.json()));
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Calling API to get task base on ID that pass in
   * @param {Number} id
   * @returns Object
   */
  async getDetailTask(id) {
    try {
      const response = await fetch(APIHelper.apiEndpoint(`/tasks/${id}`));
      return await response.json();
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Update task description base on ID
   * @param {Number} id
   * @param {String} description
   * @returns Boolean
   */
  async updateTask(id, description) {
    const updateValue = {
      description,
    };
    try {
      const response = await 
        fetch(APIHelper.apiEndpoint(`/tasks/${id}`), 
        APIHelper.requestOptions('PATCH', JSON.stringify(updateValue)));
      return response.ok;
    } catch (error) {
      throw new Error(error);
    }
  }
}
