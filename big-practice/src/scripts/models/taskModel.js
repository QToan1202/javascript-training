import Task from './task';
import APITask from '../services/apiTask';
import APIComments from '../services/apiComment';
import Storage from '../utilities/storageHelper';
import Comment from './comment';

export default class TaskModel {
  constructor() {
    this.APITask = new APITask();
    this.APIComments = new APIComments();
    this.hasLogin = Storage.getData('hasLogin');
  }

  bindErrorOccurred(callback) {
    this.showError = callback;
  }

  /**
   * Add a new task with taskName
   * @param {String} taskName
   * @param {Number} userId
   * @return Object
   */
  async addTask(taskName, userId) {
    const task = new Task(taskName, userId);
    try {
      // Calling API addTask form APITask
      return await this.APITask.addTask(task);
    } catch (error) {
      return this.showError(error);
    }
  }

  /**
   * Get all task in db.json file
   * @returns Array
   */
  async getTasks() {
    try {
      this.tasksList = await this.APITask.getTaskList();
      return this.tasksList;
    } catch (error) {
      return this.showError(error);
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
      return this.showError(error);
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
      return this.showError(error);
    }
  }

  /**
   * Delete task description
   * @param {Number} id
   * @returns Number
   */
  async deleteTask(id) {
    try {
      return await this.APITask.deleteTask(id);
    } catch (error) {
      return this.showError(error);
    }
  }

  /**
   * Get task comments
   * @param {Number} id
   * @returns Number
   */
  async getComments(id) {
    try {
      return await this.APIComments.getTaskComments(id);
    } catch (error) {
      return this.showError(error);
    }
  }

  /**
   * Add new comment
   * @param {String} content
   * @param {Number} taskId
   * @returns Object or Flash Message
   */
  async addComment(content, taskId) {
    const comment = new Comment(content, taskId);
    try {
      return await this.APIComments.addComment(comment);
    } catch (error) {
      return this.showError(error);
    }
  }

  /**
   * Delete comment
   * @param {Number} taskId
   * @returns Number
   */
  async deleteComment(id) {
    try {
      return await this.APIComments.deleteComment(id);
    } catch (error) {
      return this.showError(error);
    }
  }
}
