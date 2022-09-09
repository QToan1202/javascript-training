import Task from '../templates/task';

export default class TaskView {
  constructor() {
    this.taskName = document.getElementById('js-add-task-input');
    this.todoColumn = document.getElementById('js-todo');
    this.inProgressColumn = document.getElementById('js-in-progress');
    this.doneColumn = document.getElementById('js-done');
    this.archivedColumn = document.getElementById('js-archived');
    this.updateData = {};
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
   * Event for input to add a new task when pressing Enter
   * @param {Function} handler
   */
  bindAddTask(handler) {
    this.taskName.addEventListener('keydown', (event) => {
      const taskName = this.taskName.value.trim();

      if (event.key === 'Enter') {
        event.preventDefault();

        if (taskName) {
          handler(taskName);
          return;
        };

        alert('Task name is empty');
      }
    });
  }

  /**
   * Add event for column to get task ID to show detail information
   * @param {Function} handler
   */
  bindGetTaskDetail(handler) {
    const columns = document.getElementsByClassName('col');

    [...columns].map((col) => col.addEventListener('click', (event) => {
      const task = event.target.closest('.task');

      if (task && task.hasAttributes('id')) handler(task.id);
    }));
  }

  
  /**
   * Add event data for draggable element
   */
   dragTask() {
    const columns = document.getElementsByClassName('col');

    [...columns].map((col) => col.addEventListener('dragstart', (event) => {
      event.target.style.backgroundColor = '#CEE5FF';
      event.dataTransfer.setData('text/plain', event.target.id);
      event.dataTransfer.effectAllowed = 'move';
    }));
  }

  /**
   * Define drop zone for element
   * @param {Function} handler
   */
  dropTask(handler) {
    const columns = document.getElementsByClassName('col');

    [...columns].map((col) => col.addEventListener('dragover', (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    }));

    [...columns].map((col) => col.addEventListener('drop', (event) => {
      event.preventDefault();

      // The ID of the task been dragging
      const receiveData = event.dataTransfer.getData('text/plain');
      const dropTask = document.getElementById(receiveData);

      dropTask.removeAttribute('style');

      // Default: when drop a task on an emtpy column
      let attachColumn = [...event.target.children].find((child) => child.className === 'col__task');

      // Drop a task on another task
      if (event.target.className !== 'col') attachColumn = event.target.closest('.col__task');

      // Drop a task when at the title of the column
      if (event.target.className.search('col__title') !== -1) attachColumn = event.target.nextElementSibling;

      attachColumn.appendChild(dropTask);
      
      // When finish drop a task update state match with the column
      const newState = attachColumn.id.split('js-')[1];

      this.updateData.state = newState;
      handler(receiveData, this.updateData);
      this.updateData = {};
    }));
  }
}
