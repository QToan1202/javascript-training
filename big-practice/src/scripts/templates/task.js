import clockIcon from '../../assets/images/clock-icon.svg';
import deleteIcon from '../../assets/images/delete-icon.svg';
import editIcon from '../../assets/images/edit-icon.svg';

export default class Task {
  static renderWorkItem = (
    id,
    taskName,
    createdDate,
    dueDate,
  ) => (
    `<div class="task" id="${id}">
      <div class="task-content">
        <div class="row  row--task">
          <h2 class="task-content__title">${taskName}</h2>
          <img class="offset-left" src="${deleteIcon}" alt="delete-icon" id="delete" />
        </div>
        <div class="row  row--task">
          <p>${createdDate}</p>
          <img class="offset-left" src="${clockIcon}" alt="clock-icon" />
          <p> ${dueDate} </p>
        </div>
      </div>
    </div>`
  );

  static renderDetailTask = (
    id,
    taskName,
    dueDate,
    description,
  ) => (
    `<div class="card" id="${id}">
      <div class="card-header">
        <h2 class="card__title">${taskName}</h2>
        <select id="js-state" class="card-header__state">
          <option value="1">Todo</option>
          <option value="2">In progress</option>
          <option value="3">Done</option>
          <option value="4">Archived</option>
        </select>
        <button class="btn  offset-left" id="js-close-btn">&times;</button>
      </div>

      <div class="card-content">
        <div class="row  row--direction">
          <div class="row  row--center  title">
            <h3>Description</h3>
            <img src="${editIcon}" alt="edit-icon" />
          </div>
          <p id="js-desc" class="desc" contenteditable="true">${description}</p>
        </div>

        <div class="row  row--direction">
          <h3 class="title">Due Date</h3>
          <div class="row  row--center">
            <p id="js-due-date">${dueDate}</p>
            <p class="alert"></p>
          </div>
        </div>

        <div class="row  row--direction">
          <h3 class="title  spacing-top">Comments</h3>
          <textarea class="comments" id="js-comment" placeholder="Enter new comment..." rows="1"></textarea>
        </div>
      </div>
    </div>`
  );
}
