import Task from '../templates/task';
import constant from '../utilities/constant';

export default class View {
  constructor() {
    this.taskName = document.getElementById('js-add-task-input');
    this.todoColumn = document.getElementById('js-todo');
    this.inProgressColumn = document.getElementById('js-in-progress');
    this.doneColumn = document.getElementById('js-done');
    this.archivedColumn = document.getElementById('js-archivied');
    this.columns = [this.todoColumn, this.inProgressColumn, this.doneColumn, this.archivedColumn];
  }

  /**
   * Reset adding form
   */
  resetForm() {
    this.taskName.parentElement.reset();
  }

  /**
   * Add a new task to a specify column
   * @param {Element} column
   * @param {Object} task
   */
  displayTask(column, {
    id,
    taskName,
    createdDate,
    dueDate,
  }) {
    const element = document.createElement('template');
    element.innerHTML = Task.renderWorkItem(id, taskName, createdDate, dueDate);
    column.appendChild(element.content.firstElementChild);
  }

  /**
   * Display all task in database
   * @param {Array} tasks
   */
  renderTaskList([todoTask, inProgressTask, doneTask, archivedTask]) {
    if (todoTask.length) todoTask.map((task) => this.displayTask(this.todoColumn, task));
    if (inProgressTask.length) inProgressTask.map((task) => this.displayTask(this.inProgressColumn, task));
    if (doneTask.length) doneTask.map((task) => this.displayTask(this.doneColumn, task));
    if (archivedTask.length) archivedTask.map((task) => this.displayTask(this.archivedColumn, task));
  }

  /**
   * Display a task with all information
   * @param {Object} task
   */
  renderDetailInformation({ id, taskName, dueDate, description }) {
    const existDetailCard = document.getElementsByClassName('card');
    if (existDetailCard.length) existDetailCard[0].remove();

    const element = document.createElement('template');
    element.innerHTML = Task.renderDetailTask(id, taskName, dueDate, description);
    document.body.appendChild(element.content.firstElementChild);
    this.closeDetailTaskBtn();
  }

  /**
   * Add event for closing button in the information card
   */
  closeDetailTaskBtn() {
    const btnClose = document.querySelectorAll('#js-close-btn');
    [...btnClose].map((btn) => btn.addEventListener('click', () => {
      btn.closest('.card').remove();
    }));
  }

  /**
   * Event for input to add a new task when pressing Enter
   * @param {Function} handler
   */
  bindAddTask(handler) {
    this.taskName.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handler(this.taskName.value);
      }
    });
  }

  /**
   * Add event for column to get task ID to show detail information
   * @param {Function} handler
   */
  bindGetTaskDetail(handler) {
    this.columns.map((col) => col.addEventListener('click', (event) => {
      if (event.target.closest('.task')) handler(event.target.closest('.task').id);
    }));
  }

  /**
   * Add event when change the description
   * @param {Function} handler
   */
  bindUpdateTask(handler) {
    const desc = document.getElementById('js-desc');
    desc.addEventListener('focusout', () => {
      handler(desc.closest('.card').id, desc.textContent);
    });
  }

  /**
   * Add event data for draggable element
   */
  dragTask() {
    this.columns.map((tasks) => tasks.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('application/x-moz-node', event.target.id);
      event.dataTransfer.dragEffect = 'move';
    }));
  }

  /**
   * Define drop zone for element
   */
  dropTask() {
    const columns = document.getElementsByClassName('col');

    [...columns].map((col) => col.addEventListener('dragover', (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    }));

    [...columns].map((col) => col.addEventListener('drop', (event) => {
      event.preventDefault();
      const receiveData = event.dataTransfer.getData('application/x-moz-node');
      let attachColumn = [...event.target.children].find((child) => child.className === 'col__task');
      if (event.target.className !== 'col') attachColumn = event.target.closest('.col__task');
      attachColumn.appendChild(document.getElementById(receiveData));
    }));
  }

  /**
   * Add event for detele button to delete task base on ID
   * @param {Function} handler
   */
  bindDeleteTask(handler) {
    this.columns.map((tasks) => tasks.addEventListener('click', (event) => {
      if (event.target.id === 'delete') {
        if (confirm('Delete this task?')) handler(event.target.closest('.task').id);
        event.stopImmediatePropagation();
      }
    }, true));
  }

  /**
   * Delete a task
   */
  deleteTask(id) {
    const deleteTask = document.getElementById(id);
    deleteTask.remove();
  }


  /**
   * Redirect user to login page if they don't login before
   * @param {Boolean} hasLogin
   */
  redirectToLogin(hasLogin) {
    if (!hasLogin) window.location.replace(`${constant.BASE_URL}/login.html`);
  }

  logOutUser() {
    const userAvatar = document.getElementById('js-user-avatar');
    userAvatar.addEventListener('click', () => {
      if (confirm('Are you sure wanna log out?')) {
        sessionStorage.clear();
        window.location.reload();
      }
    });
  }
}