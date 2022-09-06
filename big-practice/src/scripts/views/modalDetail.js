import Task from '../templates/task';

export default class ModalView {
  constructor() {
    this.taskName = document.getElementById('js-add-task-input');
    this.todoColumn = document.getElementById('js-todo');
    this.inProgressColumn = document.getElementById('js-in-progress');
    this.doneColumn = document.getElementById('js-done');
    this.archivedColumn = document.getElementById('js-archivied');
    this.updateData = {};
  }

  /**
   * Add event for closing button in the information card
   * Also closing when click outside the card
   */
  closeDetailModal(handler) {
    const cardId = document.getElementsByClassName('card')[0].id;
    const btnClose = document.getElementById('js-close-btn');

    btnClose.addEventListener('click', () => {
      btnClose.closest('.overlay').remove();
      handler(cardId, this.updateData);
    });
  }

  /**
   * Display a task with all information
   * @param {Object} task
   */
  renderDetailModal({ id, taskName, dueDate, description, state }, handler) {
    const element = document.createElement('div');

    element.innerHTML = Task.renderDetailModal(id, taskName, dueDate, description);
    element.classList.add('overlay');
    document.body.appendChild(element);

    const selectState = document.getElementById('js-state');

    selectState.value = state;
    this.closeDetailModal(handler);
  }

  /**
   * Add event to update task
   */
  bindUpdateTask() {
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
        this.updateData.taskName = title.textContent;
        selectedTaskName.textContent = title.textContent;
      }

      title.classList.remove('editing');
    });

    // Add event to update description
    desc.addEventListener('focusin', () => {
      desc.classList.add('editing');
    });

    desc.addEventListener('focusout', () => {
      if (desc.textContent !== oldDesc) {
        this.updateData.description = desc.textContent;
      }

      desc.classList.remove('editing');
    });

    // Add event to update state
    state.addEventListener('change', (event) => {
      const idTask = event.currentTarget.closest('.card').id;
      const selectedTask = document.getElementById(idTask);

      // For each different states will be attached to the corresponding column
      switch (event.target.value) {
        case 'todo':
          this.updateData.state = 'todo';
          this.todoColumn.appendChild(selectedTask);
          break;

        case 'in-progress':
          this.updateData.state = 'in-progress';
          this.inProgressColumn.appendChild(selectedTask);
          break;

        case 'done':
          this.updateData.state = 'done';
          this.doneColumn.appendChild(selectedTask);
          break;

        case 'archived':
          this.updateData.state = 'archived';
          this.archivedColumn.appendChild(selectedTask);
          break;

        default:
          break;
      }
    });
  }
}
