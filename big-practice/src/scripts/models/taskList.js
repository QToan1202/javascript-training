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
   * @return Object or Error
   */
  async add(taskName, userId) {
    const task = new Task(taskName, userId);
    try {
      const { status, data } = await this.APITask.add(task);
      
      if (status !== 201) return this.showError(ERROR_CODE[status]);
      return data;
    } catch (error) {
      return this.showError(MESSAGES.INTERNET_ERROR);
    }
  }

  /**
   * Get all task in db.json file
   * @returns Array or Error
   */
  async get() {
    try {
      const { status, data } = await this.APITask.get();

      if (status !== 200) return this.showError(ERROR_CODE[status]);
      return data;
    } catch (error) {
      return this.showError(MESSAGES.INTERNET_ERROR);
    }
  }

  /**
   * Get the task information with ID
   * @param {Number} id
   * @returns Object or Error
   */
  async find(id) {
    try {
      const { status, data } = await this.APITask.find(id);

      if (status !== 200) return this.showError(ERROR_CODE[status]);
      return data;
    } catch (error) {
      return this.showError(MESSAGES.INTERNET_ERROR);
    }
  }

  /**
   * Update task
   * @param {Number} id
   * @param {Object} updateData
   * @returns Boolean or Error
   */
  async edit(id, updateData) {
    try {
      const { status } = await this.APITask.edit(id, updateData);
      
      if (status !== 200) return this.showError(ERROR_CODE[status]);
      return status;
    } catch (error) {
      return this.showError(MESSAGES.INTERNET_ERROR);
    }
  }

  /**
   * Delete task description
   * @param {Number} id
   * @returns Number or Error
   */
  async delete(id) {
    try {
      const { status } = await this.APITask.delete(id);
      
      if (status !== 200) return this.showError(ERROR_CODE[status]);
      return status;
    } catch (error) {
      return this.showError(MESSAGES.INTERNET_ERROR);
    }
  }
}
