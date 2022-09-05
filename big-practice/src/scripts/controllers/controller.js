export default class Controller {
  constructor(model, taskView, modalView) {
    this.model = model;
    this.taskView = taskView;
    this.modalView = modalView;

    this.taskView.bindAddTask(this.handlerAddTask);
    this.renderList();
    this.taskView.bindGetTaskDetail(this.handlerGetDetailTask);
  }

  /**
   * Get the task list from model
   * Then execute renderTaskList method in view
   */
  renderList = async () => {
    const tasks = await this.model.getTasks();
    this.taskView.renderTaskList(tasks);
  };

  /**
   * Sending taskName to model
   * Then receive a object to render a new task
   * Finally reset form
   * @param {String} taskName
   */
  handlerAddTask = async (taskName) => {
    const task = await this.model.addTask(taskName);
    this.taskView.displayTask(this.taskView.todoColumn, task);
    this.taskView.resetForm();
  };

  /**
   * Sending ID of the task to model
   * Then receive that task to render the detail card
   * @param {Number} id
   */
  handlerGetDetailTask = async (id) => {
    const task = await this.model.getDetailTask(id);
    this.modalView.renderDetailModal(task);
    this.modalView.bindUpdateTask(this.handlerUpdateTask);
  };

  /**
   * Update the task
   * @param {Number} id
   * @param {String} description
   * @param {String} state
   * @param {String} taskName
   */
  handlerUpdateTask = async (id, description, state, taskName) => {
    await this.model.updateTask(id, description, state, taskName);
  };
}
