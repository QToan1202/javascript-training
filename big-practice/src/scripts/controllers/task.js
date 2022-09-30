export default class Controller {
  constructor(taskList, commentList,taskView, modalDetailView) {
    this.taskList = taskList;
    this.commentList = commentList;
    this.taskView = taskView;
    this.modalDetailView = modalDetailView;

    this.init();
  }

  init = () => {
    // Send a callback to taskList to showing error for end user
    this.taskList.bindErrorOccurred(this.handleErrorOccurred);
    this.commentList.bindErrorOccurred(this.handleErrorOccurred);

    // Redirect un-login user and logout
    this.taskView.redirectToLogin(this.taskList.hasLogin);
    this.taskView.setUserInformation();
    this.taskView.logOutUser();

    // Task function handling CRUD
    this.taskView.bindAddTask(this.handleAddTask);
    this.handleRenderList();
    this.taskView.bindGetTaskDetail(this.handleGetDetailTask);
    this.taskView.bindDeleteTask(this.handleDeleteTask);

    // Handling drag/drop and search task
    this.taskView.dragTask();
    this.taskView.dropTask(this.handleUpdateTask);
    this.taskView.searchingTasks();
  };

  /**
   * Show error for end user
   * @param {String} error 
   */
  handleErrorOccurred = (error) => {
    this.taskView.showError(error);
    this.modalDetailView.showError(error);
  }

  /**
   * Get the task list from model
   * Then execute renderTaskList method in view
   */
  handleRenderList = async () => {
    const tasks = await this.taskList.get();
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
    const task = await this.taskList.add(taskName, userId);
    this.taskView.displayTask(task);
    this.taskView.resetForm();
  };

  /**
   * Sending ID of the task to model
   * Then receive that task to render the detail card
   * @param {Number} id
   */
  handleGetDetailTask = async (id) => {
    const task = await this.taskList.find(id);
    this.modalDetailView.renderDetailModal(task, this.handleUpdateTask);
    this.modalDetailView.bindUpdateTask();

    this.modalDetailView.renderCommentList(await this.commentList.get(id));
    this.modalDetailView.bindAddComment(this.handleAddComment);
    this.modalDetailView.bindDeleteComment(this.handleDeleteComment);
  };

  /**
   * Update the task
   * @param {Number} id
   * @param {Object} updateData
   */
  handleUpdateTask = async (id, updateData) => {
    await this.taskList.edit(id, updateData);
  };

  /**
   * Delete a task
   * @param {Number} id
   */
  handleDeleteTask = async (id) => {
    const status = await this.taskList.delete(id);
    if (status === 200) this.taskView.deleteTask(id);
  };

  /**
   * Create a new comment
   * @param {String} content 
   * @param {Number} taskId 
   */
  handleAddComment = async (content, taskId) => {
    const comment = await this.commentList.add(content, taskId);
    this.modalDetailView.renderComment(comment);
  };

  /**
   * Sending ID of the task to model
   * Then delete comment base on ID
   * @param {Number} id 
   */
  handleDeleteComment = async (id) => {
    const status = await this.commentList.delete(id);
    if (status === 200) this.modalDetailView.deleteComment(id);
  };
}
