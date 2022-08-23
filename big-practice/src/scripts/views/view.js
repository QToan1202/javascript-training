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
   * Add a new task to TODO column
   * @param {Object} task
   */
  displayNewTask({
    id,
    taskName,
    createdDate,
    dueDate,
  }) {
    const element = document.createElement('template');
    element.innerHTML = Task.renderWorkItem(id, taskName, createdDate, dueDate);
    this.todoColumn.appendChild(element.content.firstElementChild);
  }

  /**
   * Event for input to add a new task when pressing Enter
   * @param {String} handler
   */
  bindAddTask(handler) {
    this.taskName.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handler(this.taskName.value);
      }
    });
  }
}
