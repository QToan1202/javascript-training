import APIHelper from './apiHelpers';
import constant from './constant';

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
      const response = await fetch(this.apiEndpoint(`/tasks/${id}`));
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
    const formData = [];
    const key = encodeURIComponent('description');
    const value = encodeURIComponent(description);
    formData.push(`${key}=${value}`);
    try {
      const response = await fetch(this.apiEndpoint(`/tasks/${id}`), APIHelper.requestOptions('PATCH', formData.join('&'), 'application/x-www-form-urlencoded'));
      return response.ok;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Calling API to delete a task with the ID
   * @param {Number} id
   * @returns Number
   */
  async deleteTask(id) {
    try {
      const response = await fetch(this.apiEndpoint(`/tasks/${id}`), APIHelper.requestOptions('DELETE'));
      return response.status;
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

  /**
   * Get comments belong to task
   * @param {Number} id
   * @returns Array
   */
  async getTaskComments(id) {
    try {
      const response = await fetch(this.apiEndpoint(`/task-comments/${id}`));
      return await response.json();
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Get comments belong to task
   * @param {Object} comment
   * @returns Object
   */
  async addComment(comment) {
    try {
      const response = await fetch(APIHelper.apiEndpoint('/comments'), APIHelper.requestOptions('POST', JSON.stringify(comment), 'application/json'));
      return await response.json();
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Delete comment in the task detail
   * @param {Number} id
   * @returns Number
   */
  async deleteComment(id) {
    try {
      const response = await fetch(APIHelper.apiEndpoint(`/comments/${id}`), APIHelper.requestOptions('DELETE'));
      return response.status;
    } catch (error) {
      throw new Error(error);
    }
  }
}
