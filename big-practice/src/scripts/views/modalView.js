import Task from '../templates/task';

export default class ModalView {
  constructor() {
    this.taskName = document.getElementById('js-add-task-input');
    this.todoColumn = document.getElementById('js-todo');
    this.inProgressColumn = document.getElementById('js-in-progress');
    this.doneColumn = document.getElementById('js-done');
    this.archivedColumn = document.getElementById('js-archivied');
  }

  /**
   * Add event for closing button in the information card
   */
  closeDetailModal() {
    const btnClose = document.getElementById('js-close-btn');

    btnClose.addEventListener('click', () => {
      btnClose.closest('.overlay').remove();
    });

    document.addEventListener('click', (event) => {
      if (event.target.className === 'overlay') event.target.remove();
    });
  }

  /**
   * Display a task with all information
   * @param {Object} task
   */
   renderDetailModal({ id, taskName, dueDate, description, state }) {
    const element = document.createElement('div');
    
    element.innerHTML = Task.renderDetailModal(id, taskName, dueDate, description);
    element.classList.add('overlay');
    document.body.appendChild(element);
    
    const selectState = document.getElementById('js-state');
    
    selectState.value = state;
    this.closeDetailModal();
  }

  /**
   * Add event to update task
   * @param {Function} handler
   */
  bindUpdateTask(handler) {
    const title = document.getElementById('js-card-detail-title');
    const state = document.getElementById('js-state');
    const oldTitle = title.textContent;
    const desc = document.getElementById('js-desc');
    const oldDesc = desc.textContent;

    // Add event to update title
    title.addEventListener('focusin', () => {
      title.classList.add('editing');
    });

    title.addEventListener('focusout', (event) => {
      const idTask = event.currentTarget.closest('.card').id;
      const tasks = document.getElementsByClassName('task');
      const selectedTaskName = [...tasks].find((task) => task.id === idTask).querySelector('.task-content__title');

      // Update only new content was enter
      if (title.textContent !== oldTitle) {
        handler(title.closest('.card').id, undefined, undefined, title.textContent);
        selectedTaskName.textContent = title.textContent;
      };

      title.classList.toggle('editing');
    });

    // Add event to update description
    desc.addEventListener('focusin', () => {
      desc.classList.add('editing');
    });

    desc.addEventListener('focusout', () => {
      if (desc.textContent !== oldDesc) handler(desc.closest('.card').id, desc.textContent, undefined, undefined);
      desc.classList.toggle('editing');
    });

    // Add event to update state
    state.addEventListener('change', (event) => {
      const idTask = event.currentTarget.closest('.card').id;
      const selectedTask = document.getElementById(idTask);

      // For each different states will be attached to the corresponding column
      if (event.target.value === 'todo') this.todoColumn.appendChild(selectedTask);
      if (event.target.value === 'in-progress') this.inProgressColumn.appendChild(selectedTask);
      if (event.target.value === 'done') this.doneColumn.appendChild(selectedTask);
      if (event.target.value === 'archived') this.archivedColumn.appendChild(selectedTask);
      handler(idTask, undefined, event.target.value, undefined);
    })
  }
}
