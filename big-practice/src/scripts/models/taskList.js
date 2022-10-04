import Task from './task';
import APITask from '../services/task';
import Storage from '../utilities/storageHelper';
import ERROR_CODE from '../constants/errorCode';
import MESSAGES from '../constants/messages';

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
      const { status, data } = await this.APITask.add(task);
      
      if (status !== 201) this.showError(ERROR_CODE[status]);
      return data;
    } catch (error) {
      return this.showError(MESSAGES.INTERNET);
    }
  }

  /**
   * Get all task in db.json file
   * @returns Array
   */
  async get() {
    try {
      const { status, data } = await this.APITask.get();

      if (status !== 200) this.showError(ERROR_CODE[status]);
      return data;
    } catch (error) {
      return this.showError(MESSAGES.INTERNET);
    }
  }

  /**
   * Get the task information with ID
   * @param {Number} id
   * @returns Object
   */
  async find(id) {
    try {
      const { status, data } = await this.APITask.find(id);

      if (status !== 200) this.showError(ERROR_CODE[status]);
      return data;
    } catch (error) {
      return this.showError(MESSAGES.INTERNET);
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
      const { status } = await this.APITask.edit(id, updateData);
      
      if (status !== 200) this.showError(ERROR_CODE[status]);
      return status;
    } catch (error) {
      return this.showError(MESSAGES.INTERNET);
    }
  }

  /**
   * Delete task description
   * @param {Number} id
   * @returns Number
   */
  async delete(id) {
    try {
      const { status } = await this.APITask.delete(id);
      
      if (status !== 200) this.showError(ERROR_CODE[status]);
      return status;
    } catch (error) {
      return this.showError(MESSAGES.INTERNET);
    }
  }
}
