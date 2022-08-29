import date from '../utilities/date';

export default class Task {
  constructor(taskName, userId) {
    this.taskName = taskName;
    this.description = '';
    this.dueDate = date.getTemporaryDueDate();
    this.createdDate = date.getCurrentDate();
    this.stateId = 1;
    this.userId = userId;
  }
}
