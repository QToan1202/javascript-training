import APIHelper from './apiHelpers';
import { API_TASKS } from '../utilities/constant'

export default class APITask {
  /**
   * Calling API to add new task
   * @param {String} taskName
   * @return Object
   */
  async addTask(taskName) {
    try {
      const response = await fetch(API_TASKS , APIHelper.requestOptions('POST', taskName));
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
      const response = await fetch(`${API_TASKS}/${id}`);
      return await response.json();
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Update task base on ID
   * @param {Number} id
   * @param {Object} updateData
   * @returns Boolean
   */
  async updateTask(id, updateData) {
    try {
      const response = await 
        fetch(`${API_TASKS}/${id}`, 
        APIHelper.requestOptions('PATCH', updateData));
      return response.ok;
    } catch (error) {
      throw new Error(error);
    }
  }
}
