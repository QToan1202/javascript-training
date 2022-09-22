export default class Controller {
  constructor(taskModel, taskView, modalDetailView) {
    this.taskModel = taskModel;
    this.taskView = taskView;
    this.modalDetailView = modalDetailView;

    this.init();
  }

  init = () => {
    this.taskModel.bindErrorOccurred(this.onErrorOccurred);

    this.taskView.redirectToLogin(this.taskModel.hasLogin);
    this.taskView.setUserInformation();
    this.taskView.logOutUser();

    this.taskView.bindAddTask(this.handleAddTask);
    this.renderList();
    this.taskView.bindGetTaskDetail(this.handleGetDetailTask);

    this.taskView.dragTask();
    this.taskView.dropTask(this.handleUpdateTask);
    this.taskView.bindDeleteTask(this.handleDeleteTask);

    this.taskView.searchingTasks();
  };

  onErrorOccurred = (error) => {
    this.taskView.showError(error);
  }

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
  handleAddTask = async (taskName, userId) => {
    const task = await this.taskModel.addTask(taskName, userId);
    this.taskView.displayTask(this.taskView.todoColumn, task);
    this.taskView.resetForm();
  };

  /**
   * Sending ID of the task to model
   * Then receive that task to render the detail card
   * @param {Number} id
   */
  handleGetDetailTask = async (id) => {
    const task = await this.taskModel.getDetailTask(id);
    this.modalDetailView.renderDetailModal(task, this.handleUpdateTask);
    this.modalDetailView.bindUpdateTask();

    this.modalDetailView.renderCommentList(await this.taskModel.getComments(id));
    this.modalDetailView.bindAddComment(this.handleAddComment);
    this.modalDetailView.bindDeleteComment(this.handleDeleteComment);
  };

  /**
   * Update the task
   * @param {Number} id
   * @param {Object} updateData
   */
  handleUpdateTask = async (id, updateData) => {
    await this.taskModel.updateTask(id, updateData);
  };

  /**
   * Delete a task
   * @param {Number} id
   */
  handleDeleteTask = async (id) => {
    const status = await this.taskModel.deleteTask(id);
    if (status === 200) this.taskView.deleteTask(id);
  };

  handleAddComment = async (content, taskId) => {
    const comment = await this.taskModel.addComment(content, taskId);
    this.modalDetailView.renderComment(comment);
  };

  handleDeleteComment = async (id) => {
    const status = await this.taskModel.deleteComment(id);
    if (status === 200) this.modalDetailView.deleteComment(id);
  };
}
