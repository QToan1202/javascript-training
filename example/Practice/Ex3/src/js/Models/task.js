export default class Task {
  constructor(taskName, pomodoroDone, pomodoroCount, finished) {
    this.id = Math.floor(Math.random() * 100);
    this.taskName = taskName;
    this.pomodoroDone = pomodoroDone;
    this.pomodoroCount = pomodoroCount;
    this.finished = finished;
  }

  getId() {
    return this.id;
  }

  getTaskName() {
    return this.taskName;
  }

  setTaskName(taskName) {
    this.taskName = taskName;
  }

  getPomodoroDone() {
    return this.pomodoroDone;
  }

  setPomodoroDone(pomodoroDone) {
    this.pomodoroDone = pomodoroDone;
  }

  getPomodoroCount() {
    return this.pomodoroCount;
  }

  setPomodoroCount(pomodoroCount) {
    this.pomodoroCount = pomodoroCount;
  }

  isFinished() {
    return this.finished;
  }

  setFinished(finished) {
    this.finished = finished;
  }
}
