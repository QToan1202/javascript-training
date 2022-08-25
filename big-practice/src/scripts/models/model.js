import Task from './task';
import APITask from '../utilities/apiTask';
import APIUser from '../utilities/apiUser';

export default class Model {
  constructor() {
    this.APITask = new APITask();
    this.APIUser = new APIUser();
  }

  /**
   * Add a new task with taskName
   * @param {String} taskName
   * @return Object
   */
  async addTask(taskName) {
    // Check if taskName is empty or not
    if (!taskName.trim()) throw new Error('Name is empty');
    const task = new Task(taskName);
    try {
      // Calling API addTask form APITask
      return await this.APITask.addTask(task);
    } catch (error) {
      throw new Error('Error occurred in adding process');
    }
  }

  /**
   * Get all task in db.json file
   * @returns Array
   */
  async getTasks() {
    try {
      return await this.APITask.getTaskList();
    } catch (error) {
      throw new Error('Error occurred in getting process');
    }
  }

  /**
   * Get the task information with ID
   * @param {Number} id
   * @returns Object
   */
  async getDetailTask(id) {
    try {
      return await this.APITask.getDetailTask(id);
    } catch (error) {
      throw new Error('Error occurred in getting process');
    }
  }

  /**
   * Update task description
   * @param {Number} id
   * @param {String} description
   * @returns Boolean
   */
  async updateTask(id, description) {
    try {
      return await this.APITask.updateTask(id, description);
    } catch (error) {
      throw new Error('Error occurred in uppdate process');
    }
  }

  /**
   * Update task description
   * @param {Number} id
   * @returns Number
   */
  async deleteTask(id) {
    try {
      return await this.APITask.deleteTask(id);
    } catch (error) {
      throw new Error('Error occurred in delete process');
    }
  }

  /**
   * Get all existed users
   * Then find user account
   * @returns Boolean
   */
  async loginUser(userName, password) {
    try {
      const users = await this.APIUser.getAllUser();
      return users.some((user) => user.userName === userName && user.password === password);
    } catch (error) {
      throw new Error(error);
    }
  }
}
