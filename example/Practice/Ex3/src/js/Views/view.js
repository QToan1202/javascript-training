export default class View {
  constructor() {
    this.content = this.getElement('table-body');
    this.note = this.getElement('note');
    this.formAddTask = this.getElement('form-add-new-task');
    this.taskName = this.getElement('task-name');
    this.pomodoroCount = this.getElement('pomodoro-count');
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  getElement(selected) {
    return document.getElementById(selected);
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

  displayTasks(pomodoro) {
    this.content.innerHTML = ''; // Delete all the content in table body

    // Checking the list data is empty
    if (pomodoro.length === 0) {
      this.note.textContent = 'None';
    } else {
      pomodoro.forEach((element) => {
        // Create a row in table body
        const list = this.createElement('tr');

        // Create 3 cell
        const name = this.createElement('td');
        name.textContent = element.taskName;
        const status = this.createElement('td');
        status.textContent = `${element.pomodoroDone} / ${element.pomodoroCount} pomodori`;
        const controls = this.createElement('td');

        // Create Done Button
        const doneButton = this.createElement('button');
        doneButton.id = 'done';
        doneButton.dataId = element.id;
        doneButton.textContent = 'Done';

        // Create Increase Button
        const countButton = this.createElement('button');
        countButton.id = 'count';
        countButton.dataId = element.id;
        countButton.textContent = 'Increse Pomodoro Count';

        // Create Delete Button
        const deleteButton = this.createElement('button');
        deleteButton.id = 'delete';
        deleteButton.dataId = element.id;
        deleteButton.textContent = 'Delete task';

        /**
         * Checking finished or not
         * If it already finished hidden Done button and Count button
         */
        if (element.finished) {
          controls.textContent = 'Finished';
          doneButton.classList.add('hidden');
          countButton.classList.add('hidden');
        } else {
          controls.textContent = '';
        }

        // Add 3 button to the final cell of the row
        controls.append(doneButton, countButton, deleteButton);

        // Attach 3 cell to new row then add to the table body
        list.append(name, status, controls);
        this.content.append(list);

        // Count the total item that have
        this.note.textContent = `This table has: ${pomodoro.length} item`;
      });
    }
  }

  bindAddTask(handler) {
    this.formAddTask.addEventListener('submit', (event) => {
      event.preventDefault();// Prevent browser form submit form

      // Send the information if taskName aren't empty
      if (this.valueTask) {
        handler(this.valueTask, this.valueCount);
        this.resetForm();
      }
    });
  }

  // Add events for buttons base on the ID of element

  bindDeleteTask(handler) {
    this.content.addEventListener('click', (event) => {
      if (event.target.id === 'delete') {
        const deleteTask = event.target.dataId;
        handler(deleteTask);
      }
    });
  }

  bindIncreaseTask(handler) {
    this.content.addEventListener('click', (event) => {
      if (event.target.id === 'count') {
        const increaseTask = event.target.dataId;
        handler(increaseTask);
      }
    });
  }

  bindDoneTask(handler) {
    this.content.addEventListener('click', (event) => {
      if (event.target.id === 'done') {
        const doneTask = event.target.dataId;
        handler(doneTask);
      }
    });
  }
}
