import { STATE } from '../utilities/constant';
import date from '../utilities/date';


export default class Task {
  constructor(taskName) {
    this.taskName = taskName;
    this.description = '';
    this.dueDate = date.getTemporaryDueDate();
    this.createdDate = date.getCurrentDate();
    this.state = STATE.NEW_CREATE;
  }
}
