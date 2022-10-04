import APIHelper from './helpers';
import { API_TASKS } from '../constants/url'

export default class APITask {
  /**
   * Calling API to add new task
   * @param {String} taskName
   * @return Object
   */
  async add(taskName) {
    const response = await fetch(API_TASKS , APIHelper.requestOptions('POST', taskName));
    const result = await response.json();

    return {
      status: response.status,
      data: result
    };
  }

  /**
   * Get tasks
   * @returns Object
   */
  async get() {
    const response = await fetch(API_TASKS);
    const result = await response.json();

    return {
      status: response.status,
      data: result
    };
  }

  /**
   * Calling API to get task base on ID that pass in
   * @param {Number} id
   * @returns Object
   */
  async find(id) {
    const response = await fetch(`${API_TASKS}/${id}`);
    const result = await response.json();

    return {
      status: response.status,
      data: result
    };
  }

  /**
   * Update task base on ID
   * @param {Number} id
   * @param {Object} updateData
   * @returns Object
   */
  async edit(id, updateData) {
    const response = await 
      fetch(`${API_TASKS}/${id}`, 
      APIHelper.requestOptions('PATCH', updateData));
      
    return {status: response.status};
  }

  /**
   * Calling API to delete a task with the ID
   * @param {Number} id
   * @returns Object
   */
   async delete(id) {
     const response = await fetch(`${API_TASKS}/${id}`, APIHelper.requestOptions('DELETE'));

     return {status: response.status};
  }
}
