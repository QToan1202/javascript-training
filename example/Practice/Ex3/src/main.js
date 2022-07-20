class Model {
  constructor() {
    this.pomodoro = [
      { taskName: 'Hello', pomodoroDone: 0, pomodoroCount: 1, finished: false },
      { taskName: 'Adding MVC', pomodoroDone: 2, pomodoroCount: 4, finished: false, },
      { taskName: 'Testing', pomodoroDone: 3, pomodoroCount: 4, finished: false },
    ];
  }

  addTask(taskName, pomodoroCount) {
    const task = {
      taskName,
      pomodoroDone: 0,
      pomodoroCount,
      finished: false,
    };
    this.pomodoro.push(task);
  }
}

class View {
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

  get _valueTask() {
    return this.taskName.value;
  }

  get _valueCount() {
    return this.pomodoroCount.value;
  }

  _resetForm() {
    this.formAddTask.reset();
  }

  displayTasks(pomodoro) {
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

      if (this._valueTask) {
        handler(this._valueTask, this._valueCount);
        this._resetForm();
      }
    });
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.onPomodoroListChanged(this.model.pomodoro);
  }

  onPomodoroListChanged(pomodoro) {
    this.view.displayTasks(pomodoro);
  }

  handleAddTask = (taskName, pomodoroCount) => {
    this.model.addTask(taskName, pomodoroCount);
  };
}

const app = new Controller(new Model(), new View());
