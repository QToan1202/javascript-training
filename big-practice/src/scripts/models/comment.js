import date from '../utilities/date';
import Storage from '../utilities/storageHelper';

export default class Comment {
  constructor(content, taskId) {
    this.content = content;
    this.createdDate = date.getCurrentDate();
    this.taskId = taskId;
    this.userId = Storage.getData('user').id;
  }
}
