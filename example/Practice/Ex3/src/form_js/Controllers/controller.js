export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.bindDataChanged(this.onDataChanged);
    this.view.bindAddUser(this.handleAddUser);
    this.view.resetAll();
    this.view.bindInputChanged();

    this.onDataChanged(this.model.user, this.model.error);
  }

  onDataChanged = (user, error) => {
    this.view.displayData(user, error);
  };

  handleAddUser = (email, name, password, confirmPassword) => {
    this.model.addUser(email, name, password, confirmPassword);
  };
}
