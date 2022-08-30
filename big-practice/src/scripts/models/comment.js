import date from '../utilities/date';

export default class Comment {
  constructor(content, taskId) {
    this.content = content;
    this.createdDate = date.getCurrentDate();
    this.taskId = taskId;
    this.userId = JSON.parse(sessionStorage.getItem('user')).id;
  }
}
