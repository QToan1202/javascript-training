import Task from './task';

export default class Model {
  constructor() {
    this.pomodoro = JSON.parse(localStorage.getItem('pomodoro')) || [];
  }

  bindPomodoroListChanged(callback) {
    this.onPomodoroListChanged = callback;
  }

  bindExistedTaskName(callback) {
    this.onExistedTask = callback;
  }

  /**
   * Checking the item is already exist or not
   * @param {string} taskName
   * @returns boolean
   */
  isExist(taskName) {
    return this.pomodoro.some((item) => item.taskName === taskName);
  }

  /**
   * Add new Task if don't exist any similar task before
   * @param {string} taskName
   * @param {number} pomodoroCount
   */
  addTask(taskName, pomodoroCount) {
    if (!this.isExist(taskName)) {
      const task = new Task(taskName, 0, pomodoroCount, false);
      this.pomodoro.push(task);
      localStorage.setItem('pomodoro', JSON.stringify(this.pomodoro));
      return this.onPomodoroListChanged(this.pomodoro);
    }
    return this.onExistedTask(`Task ${taskName} existed`);
  }

  /**
   * Delete task belong to the specified ID
   * @param {number} id
   */
  deleteTask(id) {
    this.pomodoro = this.pomodoro.filter((item) => item.id !== id);
    localStorage.setItem('pomodoro', JSON.stringify(this.pomodoro));
    this.onPomodoroListChanged(this.pomodoro);
  }

  /**
   * Increase the porodori by 1
   * @param {number} id
   */
  increaseTask(id) {
    const task = this.pomodoro.find((item) => item.id === id);
    task.pomodoroDone += 1;
    if (task.pomodoroCount === task.pomodoroDone) task.finished = true;
    localStorage.setItem('pomodoro', JSON.stringify(this.pomodoro));
    this.onPomodoroListChanged(this.pomodoro);
  }

  /**
   * Mark task as finished
   * @param {number} id
   */
  doneTask(id) {
    const task = this.pomodoro.find((item) => item.id === id);
    task.finished = true;
    localStorage.setItem('pomodoro', JSON.stringify(this.pomodoro));
    this.onPomodoroListChanged(this.pomodoro);
  }
}
