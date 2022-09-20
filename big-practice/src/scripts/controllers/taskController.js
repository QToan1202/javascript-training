export default class Controller {
  constructor(taskModel, taskView, modalDetail) {
    this.taskModel = taskModel;
    this.taskView = taskView;
    this.modalDetail = modalDetail;

    this.init();
  }

  init = () => {
    this.taskView.redirectToLogin(this.taskModel.hasLogin);
    this.taskView.setUserInformation();
    this.taskView.logOutUser();

    this.taskView.bindAddTask(this.handlerAddTask);
    this.renderList();
    this.taskView.bindGetTaskDetail(this.handlerGetDetailTask);

    this.taskView.dragTask();
    this.taskView.dropTask(this.handlerUpdateTask);
    this.taskView.bindDeleteTask(this.handlerDeleteTask);

    this.taskView.searchingTasks();
  };

  /**
   * Get the task list from model
   * Then execute renderTaskList method in view
   */
  renderList = async () => {
    const tasks = await this.taskModel.getTasks();
    this.taskView.renderTaskList(tasks);
  };

  /**
   * Sending taskName to model
   * Then receive a object to render a new task
   * Finally reset form
   * @param {String} taskName
   * @param {Number} userId
   */
  handlerAddTask = async (taskName, userId) => {
    const task = await this.taskModel.addTask(taskName, userId);
    this.taskView.displayTask(this.taskView.todoColumn, task);
    this.taskView.resetForm();
  };

  /**
   * Sending ID of the task to model
   * Then receive that task to render the detail card
   * @param {Number} id
   */
  handlerGetDetailTask = async (id) => {
    const task = await this.taskModel.getDetailTask(id);
    this.modalDetail.renderDetailModal(task, this.handlerUpdateTask);
    this.modalDetail.bindUpdateTask();
    this.modalDetail.renderCommentList(await this.taskModel.getComments(id));
    this.modalDetail.bindAddComment(this.handlerAddComment);
    this.modalDetail.bindDeleteComment(this.handlerDeleteComment);
  };

  /**
   * Update the task
   * @param {Number} id
   * @param {Object} updateData
   */
  handlerUpdateTask = async (id, updateData) => {
    await this.taskModel.updateTask(id, updateData);
  };

  /**
   * Delete a task
   * @param {Number} id
   */
  handlerDeleteTask = async (id) => {
    const status = await this.taskModel.deleteTask(id);
    if (status === 200) this.taskView.deleteTask(id);
  };

  handlerAddComment = async (content, taskId) => {
    const comment = await this.taskModel.addComment(content, taskId);
    this.modalDetail.renderComment(comment);
  };

  handlerDeleteComment = async (id) => {
    await this.taskModel.deteleComment(id);
  };
}
