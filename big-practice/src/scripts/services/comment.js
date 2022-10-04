import APIHelper from './helpers';
import { API_COMMENTS } from '../constants/url';
  
export default class APIComments {
  /**
   * Get comments belong to task
   * @param {Number} id
   * @returns Array
   */
   async get(id) {
     const response = await fetch(APIHelper.apiEndpoint(`/task-comments/${id}`));
     const result = response.json();

     return result;
  }

  /**
   * Get comments belong to task
   * @param {Object} comment
   * @returns Object
   */
  async add(comment) {
    const response = await fetch(API_COMMENTS, APIHelper.requestOptions('POST', comment));
    const result = response.json();

    return result;
  }

  /**
   * Delete comment in the task detail
   * @param {Number} id
   * @returns Number
   */
  async delete(id) {
    const response = await fetch(`${API_COMMENTS}/${id}`, APIHelper.requestOptions('DELETE'));
    
    return response.status;
  }
}