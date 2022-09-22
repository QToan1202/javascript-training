import APIHelper from './apiHelpers';
import { API_TASKS } from '../utilities/constant'

export default class APITask {
  /**
   * Calling API to add new task
   * @param {String} taskName
   * @return Object
   */
  async addTask(taskName) {
    const response = await fetch(API_TASKS , APIHelper.requestOptions('POST', taskName));
    const result = await response.json();

    return result;
  }

  /**
   * Get task form 4 API each have different state
   * @returns Array
   */
  async getTaskList() {
    const response = await Promise.all([
      fetch(APIHelper.apiEndpoint('/tasks-todo')),
      fetch(APIHelper.apiEndpoint('/tasks-in-progress')),
      fetch(APIHelper.apiEndpoint('/tasks-done')),
      fetch(APIHelper.apiEndpoint('/tasks-archived')),
    ]);
    const result = await Promise.all(response.map((r) => r.json()));

    return result;
  }

  /**
   * Calling API to get task base on ID that pass in
   * @param {Number} id
   * @returns Object
   */
  async getDetailTask(id) {
    const response = await fetch(`${API_TASKS}/${id}`);
    const result = await response.json();

    return result;
  }

  /**
   * Update task base on ID
   * @param {Number} id
   * @param {Object} updateData
   * @returns Boolean
   */
  async updateTask(id, updateData) {
    const response = await 
      fetch(`${API_TASKS}/${id}`, 
      APIHelper.requestOptions('PATCH', updateData));
      
    return response.ok;
  }

  /**
   * Calling API to delete a task with the ID
   * @param {Number} id
   * @returns Number
   */
   async deleteTask(id) {
     const response = await fetch(`${API_TASKS}/${id}`, APIHelper.requestOptions('DELETE'));

     return response.status;
  }
}
