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
   * @returns Number
   */
   async get(id) {
    try {
      return await this.APIComments.get(id);
    } catch (error) {
      return this.showError('Error when getting comments list');
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
      return await this.APIComments.add(comment);
    } catch (error) {
      return this.showError('Error when adding comment');
    }
  }

  /**
   * Delete comment
   * @param {Number} taskId
   * @returns Number
   */
  async delete(id) {
    try {
      return await this.APIComments.delete(id);
    } catch (error) {
      return this.showError('Error when deleting comment');
    }
  }
}