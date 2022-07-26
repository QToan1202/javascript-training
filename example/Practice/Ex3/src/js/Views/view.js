export default class View {
  constructor() {
    this.tableBody = this.getElement('table-body');
    this.tableFoot = this.getElement('note');
    this.formAddTask = this.getElement('form-add-new-task');
    this.taskName = this.getElement('task-name');
    this.pomodoroCount = this.getElement('pomodoro-count');
    this.error = this.getElement('error');
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  getElement(selected) {
    return document.getElementById(selected);
  }

  setButtonAttribute(element, id, dataId, content) {
    element.id = id;
    element.dataId = dataId;
    element.textContent = content;
  }

  get valueTask() {
    return this.taskName.value.trim();
  }

  get valueCount() {
    return parseInt(this.pomodoroCount.value, 10);
  }

  resetForm() {
    this.formAddTask.reset();
  }

  /**
   * Display all object in array to table body
   * @param {array} pomodoro
   */
  displayTasks(pomodoro) {
    this.resetForm();
    this.tableBody.innerHTML = ''; // Delete all the content in table body

    // Checking the list data is empty
    if (!pomodoro.length) this.tableFoot.textContent = 'None';
    pomodoro.forEach((element) => {
      // Create a row in table body
      const tableRow = this.createElement('tr');

      // Create 3 cell
      const nameColumn = this.createElement('td');
      nameColumn.textContent = element.taskName;
      const statusColumn = this.createElement('td');
      statusColumn.textContent = `${element.pomodoroDone} / ${element.pomodoroCount} pomodori`;
      const controlsColumn = this.createElement('td');

      // Create Done Button
      const doneButton = this.createElement('button');
      this.setButtonAttribute(doneButton, 'done', element.id, 'Done');

      // Create Increase Button
      const countButton = this.createElement('button');
      this.setButtonAttribute(countButton, 'count', element.id, 'Increse Pomodoro Count');

      // Create Delete Button
      const deleteButton = this.createElement('button');
      this.setButtonAttribute(deleteButton, 'delete', element.id, 'Delete task');

      // Checking finished or not
      // If it already finished hidden Done button and Count button
      if (element.finished) {
        controlsColumn.textContent = 'Finished';
        doneButton.classList.add('hidden');
        countButton.classList.add('hidden');
      } else {
        controlsColumn.textContent = '';
      }

      // Add 3 button to the final cell of the row
      controlsColumn.append(doneButton, countButton, deleteButton);

      // Attach 3 cell to new row then add to the table body
      tableRow.append(nameColumn, statusColumn, controlsColumn);
      this.tableBody.append(tableRow);

      // Count the total item that have
      this.tableFoot.textContent = `This table has: ${pomodoro.length} item`;
    });
  }

  /**
   * Receive a string if add a existed taskName
   * @param {string} hasError
   */
  displayError(hasError) {
    if (hasError) {
      this.error.textContent = hasError;
      this.error.style.color = 'red';
    }
  }

  bindAddTask(handler) {
    this.formAddTask.addEventListener('submit', (event) => {
      event.preventDefault();// Prevent form submit data
      if (this.valueTask) handler(this.valueTask, this.valueCount);
    });
  }

  /**
   * Clear error when user entering input field
   */
  clearError() {
    this.taskName.addEventListener('focus', () => {
      this.error.textContent = '';
    });
  }

  // Add events for buttons base on the ID of element

  bindDeleteTask(handler) {
    this.tableBody.addEventListener('click', (event) => {
      if (event.target.id === 'delete') {
        const message = 'Delete this task?';
        if (confirm(message) === true) handler(event.target.dataId);
      }
    });
  }

  bindIncreaseTask(handler) {
    this.tableBody.addEventListener('click', (event) => {
      if (event.target.id === 'count') handler(event.target.dataId);
    });
  }

  bindDoneTask(handler) {
    this.tableBody.addEventListener('click', (event) => {
      if (event.target.id === 'done') handler(event.target.dataId);
    });
  }
}
