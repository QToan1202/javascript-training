export default class Controller {
  constructor(model, view) {
    this.view = view;
    this.model = model;

    this.view.bindAddTask(this.handlerAddTask);
    this.renderList();
    this.view.bindGetTaskDetail(this.handlerGetDetailTask);
  }

  /**
   * Get the task list from model
   * Then execute renderTaskList method in view
   */
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
    this.view.displayTask(this.view.todoColumn, task);
    this.view.resetForm();
  };

  /**
   * Sending ID of the task to model
   * Then receive that task to render the detail card
   * @param {Number} id
   */
  handlerGetDetailTask = async (id) => {
    const task = await this.model.getDetailTask(id);
    this.view.renderDetailInformation(task);
    this.view.bindUpdateTask(this.handlerUpdateTask);
  };

  /**
   * Update the task
   * @param {Number} id
   * @param {String} description
   * @param {Number} stateId
   * @param {String} taskName
   */
  handlerUpdateTask = async (id, description, stateId, taskName) => {
    await this.model.updateTask(id, description, stateId, taskName);
  };
}
