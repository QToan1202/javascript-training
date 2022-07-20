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

  addTask(taskName, pomodoroCount) {
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

  deleteTask(id) {
    this.pomodoro = this.pomodoro.filter((e) => e.id !== id);
    this.onPomodoroListChanged(this.pomodoro);
  }
}
