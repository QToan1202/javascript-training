import Task from '../templates/task';

export default class View {
  constructor() {
    this.taskName = document.getElementById('js-add-task-input');
    this.todoColumn = document.getElementById('js-todo');
    this.inProgressColumn = document.getElementById('js-in-progress');
    this.doneColumn = document.getElementById('js-done');
    this.archivedColumn = document.getElementById('js-archivied');
  }

  displayNewTask(task) {
    console.log(task);
    const addedTask = document.createElement('div');
    addedTask.innerHTML = Task.renderWorkItem(task.id, task.taskName, task.createdDate, task.dueDate);
    this.todoColumn.append(addedTask);
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
