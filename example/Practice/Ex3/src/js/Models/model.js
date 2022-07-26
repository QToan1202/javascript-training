import Task from './task';

export default class Model {
  constructor() {
    this.pomodoro = JSON.parse(localStorage.getItem('pomodoro')) || [];
  }

  bindPomodoroListChanged(callback) {
    this.onPomodoroListChanged = callback;
  }

  // Checking the item is already exist or not
  isExist(taskName) {
    return this.pomodoro.some((item) => item.taskName === taskName);
  }

  // Add new task if validate success
  addTask(taskName, pomodoroCount) {
    if (!this.isExist(taskName)) {
      const task = new Task(taskName, 0, pomodoroCount, false);
      this.pomodoro.push(task);

      localStorage.setItem('pomodoro', JSON.stringify(this.pomodoro));
      this.onPomodoroListChanged(this.pomodoro);
    }
  }

  // Delete task belong to the specified ID
  deleteTask(id) {
    this.pomodoro = this.pomodoro.filter((item) => item.id !== id);
    localStorage.setItem('pomodoro', JSON.stringify(this.pomodoro));
    this.onPomodoroListChanged(this.pomodoro);
  }

  // Increase the porodori by 1 also check if it finished or not
  increaseTask(id) {
    this.pomodoro = this.pomodoro.map((item) => {
      if (item.id === id) {
        item.pomodoroDone += 1;
        if (item.pomodoroDone === item.pomodoroCount) {
          item.finished = true;
        }
      }
      return item;
    });
    localStorage.setItem('pomodoro', JSON.stringify(this.pomodoro));
    this.onPomodoroListChanged(this.pomodoro);
  }

  // Mark task as finished
  doneTask(id) {
    this.pomodoro = this.pomodoro.map((item) => {
      if (item.id === id) {
        item.finished = true;
      }
      return item;
    });
    localStorage.setItem('pomodoro', JSON.stringify(this.pomodoro));
    this.onPomodoroListChanged(this.pomodoro);
  }
}
