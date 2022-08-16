export default class Controller {
  constructor(model, view) {
    this.view = view;
    this.model = model;

    this.view.handlerAddTask(this.handlerAddTask);
  }

  handlerAddTask = async (taskName) => {
    await this.model.addTask(taskName);
    this.view.displayNewTask(this.model.newTask);
  };
}
