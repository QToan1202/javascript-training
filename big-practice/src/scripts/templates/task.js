class Task {
  static renderWorkItem = (
    id,
    taskName,
    createdDate,
    dueDate,
  ) => `<div class="task" id="${id}">
    <div class="task-content">
      <div class="task-content--row">
        <h2 class="task-content__title">${taskName}</h2>
        <img
          src="./assets/images/delete-icon.svg"
          alt="delete-icon"
          id="delete"
        />
      </div>
      <div class="task-content--row">
        <p>${createdDate}</p>
        <p><img src="./assets/images/clock-icon.svg" alt="clock-icon" /> ${dueDate} </p>
      </div>
    </div>
  </div>`;

  static renderDetailTask = (
    id,
    taskName,
    desc,
    dueDate,
  ) => `<div class="card" id="${id}">
  <div class="card-header">
    <h2 class="title  title--card">${taskName}</h2>
    <select id="js-state" class="card-header__state">
      <option value="todo">Todo</option>
      <option value="in-progress">In progress</option>
      <option value="done">Done</option>
      <option value="archived">Archived</option>
    </select>
    <button class="card-header__btn">&times;</button>
  </div>

  <div class="card-content">
      <div class="row">
        <div class="title">
          <h3>Description</h3>
          <img width="20" height="20" src="./assets/images/edit-icon.svg" alt="edit-icon" />
        </div>
        <p id="js-desc" class="desc" contenteditable="true">${desc}</p>
      </div>

      <div class="row">
        <h3 class="title">Due Date</h3>
        <div class="row  row--inline-center">
          <p id="js-due-date">${dueDate}</p>
          <p class="alert"></p>
        </div>
      </div>

      <div class="row">
        <h3 class="title  title--spacing">Comments</h3>
        <textarea class="comments" id="js-comment" placeholder="Enter new comment..." rows="1"></textarea>
      </div>
  </div>
  </div>`;
}
