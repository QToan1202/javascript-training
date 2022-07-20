export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.bindPomodoroListChanged(this.onPomodoroListChanged);
    this.view.bindAddTask(this.handleAddTask);
    this.view.bindDeleteTask(this.handleDeleteTask);

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
}
