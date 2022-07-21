export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.bindUserChanged(this.onUserChanged);
    this.view.bindAddUser(this.handleAddUser);
    this.view.resetAll(this.handleResetForm);

    this.onUserChanged(this.model.user);
  }

  onUserChanged = (user) => {
    this.view.displayUser(user);
  };

  handleAddUser = (email, name, password, confirmPassword) => {
    this.model.addUser(email, name, password, confirmPassword);
  };

  handleResetForm = () => {
    this.view.resetAll();
  };
}
