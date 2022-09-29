import Task from '../templates/task';
import MESSAGES from '../constants/messages';
import {
  DRAG_TASK_BG,
  EFFECT_ALLOWED,
  DROP_EFFECT,
} from '../constants/common';
import { LOGIN_PAGE } from '../constants/url';
import FlashMessage from '../utilities/flashMessage';
import Session from '../utilities/storageHelper';

export default class TaskView {
  constructor() {
    this.searchTask = document.getElementById('js-search-task');
    this.clearBtn = document.getElementById('js-clear-button');
    this.taskName = document.getElementById('js-add-task-input');
    this.todoColumn = document.getElementById('js-todo');
    this.inProgressColumn = document.getElementById('js-in-progress');
    this.doneColumn = document.getElementById('js-done');
    this.archivedColumn = document.getElementById('js-archived');
    this.columns = document.getElementsByClassName('js-col');
    this.updateData = {};
  }

  setUserInformation() {
    const user = Session.getData('user');
    const userAvatar = document.getElementById('js-user-avatar');
    const userName = document.getElementById('js-user-name');

    userAvatar.src = user.avatar;
    userName.textContent = user.userName;
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
  renderTaskList([ todoTasks, inProgressTasks, doneTasks, archivedTasks ]) {
    if (todoTasks.length) todoTasks.map((task) => this.displayTask(this.todoColumn, task));
    if (inProgressTasks.length) inProgressTasks.map((task) => this.displayTask(this.inProgressColumn, task));
    if (doneTasks.length) doneTasks.map((task) => this.displayTask(this.doneColumn, task));
    if (archivedTasks.length) archivedTasks.map((task) => this.displayTask(this.archivedColumn, task));
  }

  /**
   * Event for input to add a new task when pressing Enter
   * @param {Function} handler
   */
  bindAddTask(handler) {
    this.taskName.addEventListener('keydown', (event) => {
      const taskName = this.taskName.value.trim();
      const user = Session.getData('user');

      if (event.key === 'Enter') {
        event.preventDefault();

        if (taskName) {
          handler(taskName, user.id);
          return;
        };

        this.showError(MESSAGES.EMPTY_NAME);
      }
    });
  }

  /**
   * Add event for column to get task ID to show detail information
   * @param {Function} handler
   */
  bindGetTaskDetail(handler) {

    [...this.columns].map((col) => col.addEventListener('click', (event) => {
      const task = event.target.closest('.task');

      if (task && task.hasAttribute('id')) handler(task.id);
    }));
  }

  
  /**
   * Add event data for draggable element
   */
   dragTask() {
    [...this.columns].map((col) => col.addEventListener('dragstart', (event) => {
      const targetElement = event.target;

      targetElement.style.backgroundColor = DRAG_TASK_BG;
      event.dataTransfer.setData('text/plain', targetElement.id);
      event.dataTransfer.effectAllowed = EFFECT_ALLOWED;
    }));
  }

  /**
   * Define drop zone for element
   */
  dropZone() {

    [...this.columns].map((col) => col.addEventListener('dragover', (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = DROP_EFFECT;
    }));
  }

  /**
   * Handler event when drop a task
   * @param {Function} handler
   */
  dropTask(handler) {
    this.dropZone();

    [...this.columns].map((col) => col.addEventListener('drop', (event) => {
      event.preventDefault();

      // The ID of the task been dragging
      const taskId = event.dataTransfer.getData('text/plain');
      const dropTask = document.getElementById(taskId);
      const targetElement = event.target;

      dropTask.removeAttribute('style');

      // Default: when drop a task on an empty column
      let attachColumn = targetElement.querySelector('.js-col-task');

      // Drop a task on another task
      if (!targetElement.classList.contains('js-col')) attachColumn = targetElement.closest('.js-col-task');

      // Drop a task when at the title of the column
      if (targetElement.classList.contains('js-col-title')) attachColumn = targetElement.nextElementSibling;

      attachColumn.appendChild(dropTask);
      this.updateAfterDrop(handler, taskId, attachColumn)
    }));
  }

  /**
   * When finish drop a task update state match with the column
   * @param {Function} handler 
   * @param {Number} taskId 
   * @param {String} attachColumn have the Id pattern js-[state]
   */
  updateAfterDrop(handler, taskId, attachColumn) {
    // When split state out I have array ['', state]
    const [ , newState] = attachColumn.id.split('js-');

    this.updateData.state = newState;
    handler(taskId, this.updateData);
    this.updateData = {};
  }

  
  /**
   * Add event for delete button to delete task base on ID
   * @param {Function} handler
   */
   bindDeleteTask(handler) {
    [...this.columns].map((tasks) => tasks.addEventListener('click', (event) => {
      if (event.target.id === 'delete') {
        const taskId = event.target.closest('.task').id;

        if (!taskId) {
          this.showError(MESSAGES.MISS_ID);
          return;
        }

        if (confirm(MESSAGES.DELETE)) handler(taskId);
        event.stopImmediatePropagation();
      }
    }, true));
  }

  /**
   * Delete a task
   */
  deleteTask(id) {
    const task = document.getElementById(id);

    task.remove();
  }

  
  /**
   * Redirect user to login page if they don't login before
   * @param {Boolean} hasLogin
   */
   redirectToLogin(hasLogin) {
    if (!hasLogin) window.location.replace(LOGIN_PAGE);
  }

  /**
   * Add event when user click avatar they can log out the system
   */
  logOutUser() {
    const userAvatar = document.getElementById('js-user-avatar');
    
    userAvatar.addEventListener('click', () => {
      if (confirm(MESSAGES.LOGOUT)) {
        Session.clearData();
        window.location.reload();
      }
    });
  }

  /**
   * Add event to search task 
   */
  searchingTasks() {
    const allTasks = document.getElementsByClassName('js-task');
    const tasksName = document.getElementsByClassName('js-task-title');

    this.searchTask.addEventListener('input', (event) => {
      event.preventDefault();
      [...allTasks].map((task) => task.classList.remove('card--hidden'));

      // Create a RegEx to search task with i flag (case insensitive)
      const searchReg = new RegExp(this.searchTask.value, 'i');

      // Search for all tasks that don't match RegEx
      const findedTask = [...tasksName].filter((taskName) => taskName.textContent.search(searchReg) === -1);

      // Get the parent element of task
      const tasksParent = [...findedTask].map((task) => task.closest('.js-task'));

      tasksParent.map((task) => task.classList.add('card--hidden'));
    });

    // Add event for clear button to clear text
    this.clearBtn.addEventListener('click', () => [...allTasks].map((task) => task.classList.remove('card--hidden')));
  }

 /**
   * Create an flash message error 
   * @param {String} error 
   */
  showError(error) {
    FlashMessage.showMessage(error)
  }
}