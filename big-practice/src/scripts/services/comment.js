import APIHelper from './helpers';
import { API_COMMENTS } from '../constants/url';
  
export default class APIComments {
  /**
   * Get comments belong to task
   * @param {Number} id
   * @returns Object
   */
   async get(id) {
    const response = await fetch(APIHelper.apiEndpoint(`/task-comments/${id}`));
    const result = await response.json();

    return {
      status: response.status,
      data: result
    };
  }

  /**
   * Get comments belong to task
   * @param {Object} comment
   * @returns Object
   */
  async add(comment) {
    const response = await fetch(API_COMMENTS, APIHelper.requestOptions('POST', comment));
    const result = await response.json();

    return {
      status: response.status,
      data: result
    };
  }

  /**
   * Delete comment in the task detail
   * @param {Number} id
   * @returns Object
   */
  async delete(id) {
    const response = await fetch(`${API_COMMENTS}/${id}`, APIHelper.requestOptions('DELETE'));
    
    return {status: response.status};
  }
}