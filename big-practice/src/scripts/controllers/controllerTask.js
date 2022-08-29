export default class Controller {
  constructor(model, view) {
    this.view = view;
    this.model = model;

    this.init();
  }

  init = async () => {
    this.view.redirectToLogin(this.model.hasLogin);
    this.view.setUserInformation();
    this.view.logOutUser();

    this.view.bindAddTask(this.handlerAddTask);
    await this.renderList();
    this.view.bindGetTaskDetail(this.handlerGetDetailTask);

    this.view.dragTask();
    this.view.dropTask();
    this.view.bindDeleteTask(this.handlerDeleteTask);
  };

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
   * @param {Number} userId
   */
  handlerAddTask = async (taskName, userId) => {
    const task = await this.model.addTask(taskName, userId);
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
   * Update the task description
   * @param {Number} id
   * @param {String} description
   */
  handlerUpdateTask = async (id, description) => {
    const isOk = await this.model.updateTask(id, description);
  };

  /**
   * Delete a task
   * @param {Number} id
   */
  handlerDeleteTask = async (id) => {
    const status = await this.model.deleteTask(id);
    if (status === 200) this.view.deleteTask(id);
  };
}
