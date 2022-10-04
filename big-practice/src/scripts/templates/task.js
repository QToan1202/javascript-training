import clockIcon from '../../assets/images/clock-icon.svg';
import deleteIcon from '../../assets/images/delete-icon.svg';
import editIcon from '../../assets/images/edit-icon.svg';
import capitalize from '../utilities/capitalize';
import STATES from '../constants/states';
import date from '../utilities/date';

export default class Task {
  static renderWorkItem = (
    id,
    taskName,
    createdDate,
    dueDate,
  ) => (
    `<div class="task  js-task" id="${id}" draggable="true">
      <div class="task-content">
        <div class="row  row--task">
          <h2 class="task-content__title  js-task-title">${taskName}</h2>
          <img class="offset-left" src="${deleteIcon}" alt="delete-icon" id="delete" draggable="false" />
        </div>
        <div class="row  row--task">
          <p>${date.diffTime(createdDate)}</p>
          <img class="offset-left" src="${clockIcon}" alt="clock-icon" draggable="false" />
          <p id="js-due-date">${date.diffTime(dueDate, Math.ceil, 'left')}</p>
        </div>
      </div>
    </div>`
  );

  static renderDetailModal = (
    id,
    taskName,
    dueDate,
    description,
  ) => (
    `<div class="card" id="${id}">
      <div class="card-header">
        <h2 class="card__title" id="js-card-detail-title" contenteditable="true">${taskName}</h2>
        <select id="js-state" class="card-header__state">
          ${Object.values(STATES).map((state) => (
            `<option value="${state}">
              ${capitalize(state)}
            </option>`
          ))}
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
        <input class="date" type="date" id="js-due-date-modal" value="${date.convertDateInput(dueDate)}" />
      </div>
    </div>

        <div class="row  row--direction">
          <h3 class="title  spacing-top">Comments</h3>
          <textarea class="comments" id="js-comment" placeholder="Enter new comment..." rows="1"></textarea>
        </div>
        <div id="js-comment-container"></div>
      </div>
    </div>`
  );
}
