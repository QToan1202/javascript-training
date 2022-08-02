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
}
