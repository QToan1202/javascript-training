import Storage from '../utilities/storageHelper';

export default class Comment {
  constructor(content, taskId) {
    this.content = content;
    this.createdDate = Date.now();
    this.taskId = taskId;
    this.userId = Storage.getData('user').id;
  }
}
