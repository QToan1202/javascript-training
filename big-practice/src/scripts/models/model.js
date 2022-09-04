import Task from './task';
import APITask from '../utilities/apiTask';

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
   * Update task
   * @param {Number} id
   * @param {String} description
   * @param {Number} stateId
   * @param {String} taskName
   * @returns Boolean
   */
  async updateTask(id, description, stateId, taskName) {
    try {
      return await this.APITask.updateTask(id, description, stateId, taskName);
    } catch (error) {
      throw new Error('Error occurred in uppdate process');
    }
  }
}
