export default class Controller {
  constructor(model, view) {
    this.view = view;
    this.model = model;

    this.view.bindAddTask(this.handlerAddTask);
    this.renderList();
  }

  renderList = async () => {
    const tasks = await this.model.getTasks();
    this.view.renderTaskList(tasks);
  };

  /**
   * Sending taskName to model
   * Then receive a object to render a new task
   * Finally reset form
   * @param {String} taskName
   */
  handlerAddTask = async (taskName) => {
    const task = await this.model.addTask(taskName);
    this.view.displayNewTask(task);
    this.view.resetForm();
  };
}
