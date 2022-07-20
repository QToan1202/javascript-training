export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.bindPomodoroListChanged(this.onPomodoroListChanged);
    this.view.bindAddTask(this.handleAddTask);
    this.view.bindDeleteTask(this.handleDeleteTask);
    this.view.bindIncreaseTask(this.handleIncreaseTask);
    this.view.bindDoneTask(this.handleDoneTask);

    this.onPomodoroListChanged(this.model.pomodoro);
  }

  onPomodoroListChanged = (pomodoro) => {
    this.view.displayTasks(pomodoro);
  };

  handleAddTask = (taskName, pomodoroCount) => {
    this.model.addTask(taskName, pomodoroCount);
  };

  handleDeleteTask = (id) => {
    this.model.deleteTask(id);
  };

  handleIncreaseTask = (id) => {
    this.model.increaseTask(id);
  };

  handleDoneTask = (id) => {
    this.model.doneTask(id);
  };
}
