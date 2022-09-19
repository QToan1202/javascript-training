import { STATES } from '../utilities/constant';
import date from '../utilities/date';


export default class Task {
  constructor(taskName, userId) {
    this.taskName = taskName;
    this.description = '';
    this.dueDate = date.getTemporaryDueDate();
    this.createdDate = date.getCurrentDate();
    this.state = STATES.NEW_CREATE;
    this.userId = userId;
  }
}
