import Task from './task';
import APITask from '../services/task';
import Storage from '../utilities/storageHelper';

export default class TaskList {
  constructor() {
    this.APITask = new APITask();
    this.hasLogin = Storage.getData('hasLogin');
  }

  /**
   * Alert error when occurred
   * @param {Function} callback Controller.handleErrorOccurred
   */
  bindErrorOccurred(callback) {
    this.showError = callback;
  }

  /**
   * Add a new task with taskName
   * @param {String} taskName
   * @param {Number} userId
   * @return Object
   */
  async add(taskName, userId) {
    const task = new Task(taskName, userId);
    try {
      // Calling API addTask form APITask
      return await this.APITask.add(task);
    } catch (error) {
      return this.showError('Error when adding a new task');
    }
  }

  /**
   * Get all task in db.json file
   * @returns Array
   */
  async get() {
    try {
      this.tasksList = await this.APITask.get();
      return this.tasksList;
    } catch (error) {
      return this.showError('Error when getting tasks list');
    }
  }

  /**
   * Get the task information with ID
   * @param {Number} id
   * @returns Object
   */
  async find(id) {
    try {
      return await this.APITask.find(id);
    } catch (error) {
      return this.showError('Error when getting task content');
    }
  }

  /**
   * Update task
   * @param {Number} id
   * @param {Object} updateData
   * @returns Boolean
   */
  async edit(id, updateData) {
    try {
      return await this.APITask.edit(id, updateData);
    } catch (error) {
      return this.showError('Error when updating task');
    }
  }

  /**
   * Delete task description
   * @param {Number} id
   * @returns Number
   */
  async delete(id) {
    try {
      return await this.APITask.delete(id);
    } catch (error) {
      return this.showError('Error when deleting task');
    }
  }
}
