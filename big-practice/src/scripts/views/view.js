import Task from '../templates/task';

export default class View {
  constructor() {
    this.taskName = document.getElementById('js-add-task-input');
    this.todoColumn = document.getElementById('js-todo');
    this.inProgressColumn = document.getElementById('js-in-progress');
    this.doneColumn = document.getElementById('js-done');
    this.archivedColumn = document.getElementById('js-archivied');
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
  renderTaskList([todoTasks, inProgressTasks, doneTasks, archivedTasks]) {
    if (todoTasks.length) todoTasks.map((task) => this.displayTask(this.todoColumn, task));
    if (inProgressTasks.length) inProgressTasks.map((task) => this.displayTask(this.inProgressColumn, task));
    if (doneTasks.length) doneTasks.map((task) => this.displayTask(this.doneColumn, task));
    if (archivedTasks.length) archivedTasks.map((task) => this.displayTask(this.archivedColumn, task));
  }

  /**
   * Display a task with all information
   * @param {Object} task
   */
  renderDetailInformation({ id, taskName, dueDate, description, state: { name } }) {
    const existDetailCard = document.getElementsByClassName('card');
    if (existDetailCard.length) existDetailCard[0].remove();

    const element = document.createElement('template');
    element.innerHTML = Task.renderDetailTask(id, taskName, dueDate, description);
    document.body.appendChild(element.content.firstElementChild);
    const select = document.getElementById('js-state');
    select.value = name;
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
    this.todoColumn.addEventListener('click', (event) => handler(event.target.closest('.task').id));
    this.inProgressColumn.addEventListener('click', (event) => handler(event.target.closest('.task').id));
    this.doneColumn.addEventListener('click', (event) => handler(event.target.closest('.task').id));
    this.archivedColumn.addEventListener('click', (event) => handler(event.target.closest('.task').id));
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
}
