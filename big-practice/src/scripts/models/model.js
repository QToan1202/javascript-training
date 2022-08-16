import Task from './task';
import APITask from '../utilities/apiTask';

export default class Model {
  constructor() {
    this.newTask = {};
    this.APITask = new APITask();
  }

  async addTask(taskName) {
    const task = new Task(taskName);
    const newTask = await this.APITask.addTask(task);
    this.newTask = newTask;
  }
}
