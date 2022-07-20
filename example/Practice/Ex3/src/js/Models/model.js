export default class Model {
  constructor() {
    this.pomodoro = [
      {
        id: 1,
        taskName: 'Hello',
        pomodoroDone: 0,
        pomodoroCount: 1,
        finished: false,
      },
      {
        id: 2,
        taskName: 'Adding MVC',
        pomodoroDone: 2,
        pomodoroCount: 4,
        finished: false,
      },
      {
        id: 3,
        taskName: 'Testing',
        pomodoroDone: 3,
        pomodoroCount: 4,
        finished: false,
      },
    ];
  }

  bindPomodoroListChanged(callback) {
    this.onPomodoroListChanged = callback;
  }

  isValidate(taskName) {
    if (taskName.trim().length !== 0) {
      const obj = this.pomodoro.find((item) => item.taskName === taskName);
      return obj === undefined;
    }
    return false;
  }

  addTask(taskName, pomodoroCount) {
    if (this.isValidate(taskName)) {
      const task = {
        id: Math.floor(Math.random() * 100),
        taskName,
        pomodoroDone: 0,
        pomodoroCount,
        finished: false,
      };
      this.pomodoro.push(task);
      this.onPomodoroListChanged(this.pomodoro);
    }
  }

  deleteTask(id) {
    this.pomodoro = this.pomodoro.filter((item) => item.id !== id);
    this.onPomodoroListChanged(this.pomodoro);
  }

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
    this.onPomodoroListChanged(this.pomodoro);
  }

  doneTask(id) {
    this.pomodoro = this.pomodoro.map((item) => {
      if (item.id === id) {
        item.finished = true;
      }
      return item;
    });
    this.onPomodoroListChanged(this.pomodoro);
  }
}
