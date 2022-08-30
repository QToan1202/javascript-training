import constant from './constant';

export default class APITask {
  /**
   * Create options object for request
   * @param {String} method
   * @param {*} data
   * @returns Object
   */
  requestOptions(method, data = null, contentType = 'application/json') {
    return {
      method,
      body: data,
      headers: {
        'Content-Type': contentType,
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
      const response = await fetch(this.apiEndpoint('/tasks'), this.requestOptions('POST', JSON.stringify(taskName), 'application/json'));
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
      const response = await fetch(this.apiEndpoint(`/tasks/${id}`), this.requestOptions('PATCH', formData.join('&'), 'application/x-www-form-urlencoded'));
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
      const response = await fetch(this.apiEndpoint(`/tasks/${id}`), this.requestOptions('DELETE'));
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
      const response = await fetch(this.apiEndpoint(`/comments/${id}`));
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
      const response = await fetch(this.apiEndpoint('/comments'), this.requestOptions('POST', JSON.stringify(comment), 'application/json'));
      return await response.json();
    } catch (error) {
      throw new Error(error);
    }
  }
}
