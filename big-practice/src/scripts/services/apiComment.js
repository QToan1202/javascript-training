import APIHelper from './apiHelpers';
import { API_COMMENTS } from '../utilities/constant';
  
export default class APIComments {
  /**
   * Get comments belong to task
   * @param {Number} id
   * @returns Array
   */
   async getTaskComments(id) {
    try {
      const response = await fetch(APIHelper.apiEndpoint(`/task-comments/${id}`));
      return await response.json();
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Get comments belong to task
   * @param {Object} comment
   * @returns Object
   */
  async addComment(comment) {
    try {
      const response = await fetch(API_COMMENTS, APIHelper.requestOptions('POST', comment));
      return await response.json();
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Delete comment in the task detail
   * @param {Number} id
   * @returns Number
   */
  async deleteComment(id) {
    try {
      const response = await fetch(`${API_COMMENTS}/${id}`, APIHelper.requestOptions('DELETE'));
      return response.status;
    } catch (error) {
      throw new Error(error);
    }
  }
}