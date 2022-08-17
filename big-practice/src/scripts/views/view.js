import Task from '../templates/task';

export default class View {
  constructor() {
    this.taskName = document.getElementById('js-add-task-input');
    this.todoColumn = document.getElementById('js-todo');
    this.inProgressColumn = document.getElementById('js-in-progress');
    this.doneColumn = document.getElementById('js-done');
    this.archivedColumn = document.getElementById('js-archivied');
  }

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

  handlerAddTask(handler) {
    this.taskName.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handler(this.taskName.value);
      }
    });
  }
}
