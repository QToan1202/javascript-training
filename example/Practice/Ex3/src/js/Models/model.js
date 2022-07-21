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

  // Checking the item is already exist or not
  isValidate(taskName) {
    let obj;
    if (taskName.trim().length !== 0) {
      obj = this.pomodoro.find((item) => item.taskName === taskName.trim());
    }
    return obj === undefined;
  }

  // Add new task if validate success
  addTask(taskName, pomodoroCount) {
    if (this.isValidate(taskName)) {
      const task = {
        id: Math.floor(Math.random() * 100), // Genererate random ID(0-99)
        taskName,
        pomodoroDone: 0,
        pomodoroCount,
        finished: false,
      };
      this.pomodoro.push(task);
      this.onPomodoroListChanged(this.pomodoro); // Tell the view to render the table body
    }
  }

  // Delete task belong to the specified ID
  deleteTask(id) {
    this.pomodoro = this.pomodoro.filter((item) => item.id !== id);
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
    this.onPomodoroListChanged(this.pomodoro);
  }
}
