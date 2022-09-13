export default class Controller {
  constructor(model, taskView, modalDetail) {
    this.model = model;
    this.taskView = taskView;
    this.modalDetail = modalDetail;

    this.init();
  }

  init = async () => {
    this.taskView.bindAddTask(this.handlerAddTask);
    await this.renderList();
    this.taskView.bindGetTaskDetail(this.handlerGetDetailTask);

    this.taskView.dragTask();
    this.taskView.dropTask(this.handlerUpdateTask);
    this.taskView.bindDeleteTask(this.handlerDeleteTask);
  };

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
    this.modalDetail.renderDetailModal(task, this.handlerUpdateTask);
    this.modalDetail.bindUpdateTask();
  };

  /**
   * Update the task
   * @param {Number} id
   * @param {Object} updateData
   */
  handlerUpdateTask = async (id, updateData) => {
    await this.model.updateTask(id, updateData);
  };

  /**
   * Delete a task
   * @param {Number} id
   */
  handlerDeleteTask = async (id) => {
    const status = await this.model.deleteTask(id);
    if (status === 200) this.taskView.deleteTask(id);
  };
}
