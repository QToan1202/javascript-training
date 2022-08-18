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
    if (!taskName) throw new Error('Name is empty');
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
}
