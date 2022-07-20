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
    return this.taskName.value;
  }

  get valueCount() {
    return parseInt(this.pomodoroCount.value, 10);
  }

  resetForm() {
    this.formAddTask.reset();
  }

  displayTasks(pomodoro) {
    this.content.innerHTML = '';

    if (pomodoro.length === 0) {
      this.note.textContent = 'None';
    } else {
      pomodoro.forEach((element) => {
        const list = this.createElement('tr');
        const name = this.createElement('td');
        name.textContent = element.taskName;
        const status = this.createElement('td');
        status.textContent = `${element.pomodoroDone} / ${element.pomodoroCount} pomodori`;
        const controls = this.createElement('td');
        if (element.finished) {
          controls.textContent = 'Finished';
        } else {
          controls.textContent = '';
        }

        const doneButton = this.createElement('button');
        doneButton.textContent = 'Done';
        const countButton = this.createElement('button');
        countButton.textContent = 'Increse Pomodoro Count';
        const deleteButton = this.createElement('button');
        deleteButton.dataId = element.id;
        deleteButton.textContent = 'Delete task';
        controls.append(doneButton, countButton, deleteButton);

        list.append(name, status, controls);
        this.content.append(list);
        this.note.textContent = `This table has: ${pomodoro.length} item`;
      });
    }
  }

  bindAddTask(handler) {
    this.formAddTask.addEventListener('submit', (event) => {
      event.preventDefault();

      if (this.valueTask) {
        handler(this.valueTask, this.valueCount);
        this.resetForm();
      }
    });
  }

  bindDeleteTask(handler) {
    this.content.addEventListener('click', (event) => {
      const deleteTask = event.target.dataId;
      handler(deleteTask);
    });
  }
}
