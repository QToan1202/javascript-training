import Task from './task';
import APITask from '../services/apiTask';

export default class Model {
  constructor() {
    this.APITask = new APITask();
  }

  /**
   * Add a new task with taskName
   * @param {String} taskName
   * @return Object
   */
  async addTask(taskName) {
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
   * Update task
   * @param {Number} id
   * @param {Object} updateData
   * @returns Boolean
   */
  async updateTask(id, updateData) {
    try {
      return await this.APITask.updateTask(id, updateData);
    } catch (error) {
      throw new Error('Error occurred in uppdate process');
    }
  }
}
