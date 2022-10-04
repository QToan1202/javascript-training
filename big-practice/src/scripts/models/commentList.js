import ERROR_CODE from '../constants/errorCode';
import MESSAGES from '../constants/messages';
import APIComment from '../services/comment';
import Comment from './comment';

export default class CommentList {
  constructor() {
    this.APIComments = new APIComment();
  }

  /**
   * Alert error when occurred
   * @param {Function} callback Controller.handleErrorOccurred
   */
  bindErrorOccurred(callback) {
    this.showError = callback;
  }

  /**
   * Get task comments
   * @param {Number} id
   * @returns Array
   */
   async get(id) {
    try {
      const { status, data } = await this.APIComments.get(id);
      
      if (status !== 200) this.showError(ERROR_CODE[status]);
      return data;
    } catch (error) {
      return this.showError(MESSAGES.INTERNET);
    }
  }

  /**
   * Add new comment
   * @param {String} content
   * @param {Number} taskId
   * @returns Object or Flash Message
   */
  async add(content, taskId) {
    const comment = new Comment(content, taskId);
    try {
      const { status, data } = await this.APIComments.add(comment);
      
      if (status !== 201) this.showError(ERROR_CODE[status]);
      return data;
    } catch (error) {
      return this.showError(MESSAGES.INTERNET);
    }
  }

  /**
   * Delete comment
   * @param {Number} taskId
   * @returns Number
   */
  async delete(id) {
    try {
      const { status } = await this.APIComments.delete(id);
      
      if (status !== 201) this.showError(ERROR_CODE[status]);
      return status;
    } catch (error) {
      return this.showError(MESSAGES.INTERNET);
    }
  }
}