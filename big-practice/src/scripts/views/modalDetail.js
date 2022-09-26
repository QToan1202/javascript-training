import Comment from '../templates/comment';
import Task from '../templates/task';
import date from '../utilities/date';
import FlashMessage from '../utilities/flashMessage';
import Storage from '../utilities/storageHelper';

export default class ModalView {
  constructor() {
    this.updateData = {};
    this.user = Storage.getData('user');
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
      if (Object.keys(this.updateData).length) {
        handler(cardId, this.updateData);
        this.updateData = {};
      };
    });
  }

  /**
   * Display a task with all information
   * @param {Object} task
   */
  renderDetailModal(task, handler) {
    if(!Object.keys(task).length) throw FlashMessage.showMessage('Empty content');

    const { id, taskName, dueDate, description, state } = task;
    const element = document.createElement('div');

    element.innerHTML = Task.renderDetailModal(id, taskName, dueDate, description);
    element.classList.add('overlay');
    document.body.appendChild(element);

    const selectState = document.getElementById('js-state');

    selectState.value = state;

    const alert = document.createElement('p');
    const dueDateElement = document.getElementById('js-due-date-modal');

    alert.classList.add('alert');

    // Get the diff time at the beginner the string 
    const [ diffDate ] = date.diffTime(dueDate, Math.ceil).split(' ');
    const overDue = new Date(dueDate) < Date.now();

    // Only show alert when time diff less than or equal 3 days and not over due
    if (diffDate <= 3 && !overDue) {
      alert.textContent = date.diffTime(dueDate, Math.ceil, 'left');
      dueDateElement.parentElement.appendChild(alert);
    }
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
    const dueDate = document.getElementById('js-due-date-modal');

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

      // When state changed it will find the column that match with the state value
      const selectState = event.target.value;
      const attachColumn = document.getElementById(`js-${selectState}`);

      this.updateData.state = selectState;
      attachColumn.appendChild(selectedTask);
    });

    // Add event to update due date
    dueDate.addEventListener('change', (event) => {
      const idTask = event.currentTarget.closest('.card').id;
      const selectedTask = document.getElementById(idTask);
      const oldDueDate = selectedTask.querySelector('#js-due-date');
      const newDueDate = date.formatDate(event.target.value);

      this.updateData.dueDate = newDueDate;
      oldDueDate.innerHTML = date.diffTime(newDueDate, Math.ceil, 'left');
    })
  }

  /**
   * Render each comment object to bottom the modal
   * @param {Object} comment 
   */
  renderComment({ content, id, createdDate, user: { avatar, userName } }) {
    const commentContainer = document.getElementById('js-comment-container');
    const comment = document.createElement('template');

    comment.innerHTML = Comment.renderComment(avatar, userName, content, id, createdDate);
    commentContainer.appendChild(comment.content.firstElementChild);
  }

  /**
   * Append all comment belong to that task to the bottom of detail card
   * @param {Array} comments
   */
  renderCommentList(comments) {
    comments.map((comment) => this.renderComment(comment));
  }

  /**
   * Register event add new comment for a task
   * @param {Function} handler 
   */
  bindAddComment(handler) {
    const commentElement = document.getElementById('js-comment');
    
    commentElement.addEventListener('keyup', (event) => {
      const commentContent = commentElement.value.trim();
      const cardId = event.target.closest('.card').id;

      if (event.key === 'Enter') {
        if (commentContent) handler(commentContent, Number(cardId));
        commentElement.value = '';
      }
    });
  }

  /**
   * Add event to delete comment base on ID
   * @param {Function} handler 
   */
  bindDeleteComment(handler) {
    // Create regEx
    const regExComment = /^comment/i;
    const commentContainer = document.getElementById('js-comment-container');

    commentContainer.addEventListener('click', (event) => {
      const elementId = event.target.id;

      if (regExComment.test(elementId)) {
      // Split to get the ID of comment get the array ['', id]
      const [ , commentId] = elementId.split('comment-');

        if (confirm('Delete comment?')) handler(commentId);
      };
    });
  }

  /**
   * Deleting comment only the delete request success
   * @param {Number} id 
   */
  deleteComment(id) {
    const deletedComment = document.querySelector(`[id='comment-${id}']`)
    const parent = deletedComment.closest('.js-comment-field');

    parent.remove();
  }
}
