import Task from './task';
import APITask from '../utilities/apiTask';
import Comment from './comment';

export default class Model {
  constructor() {
    this.APITask = new APITask();
    this.hasLogin = JSON.parse(sessionStorage.getItem('hasLogin')) || false;
  }

  /**
   * Add a new task with taskName
   * @param {String} taskName
   * @param {Number} userId
   * @return Object
   */
  async addTask(taskName, userId) {
    // Check if taskName is empty or not
    if (!taskName.trim()) throw new Error('Name is empty');
    const task = new Task(taskName, userId);
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
   * Get task comments
   * @param {Number} id
   * @returns Number
   */
  async getComments(id) {
    try {
      return await this.APITask.getTaskComments(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Add new comment
   * @param {String} content
   * @param {Number} taskId
   * @returns Object
   */
  async addComment(content, taskId) {
    if (!content.trim()) throw new Error('Comment is empty');
    const comment = new Comment(content, taskId);
    try {
      return await await this.APITask.addComment(comment);
    } catch (error) {
      throw new Error('Error occurred in adding comment process');
    }
  }
}
