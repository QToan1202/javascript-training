export default class Model {
  constructor() {
    this.user = {};
  }

  bindUserChanged(callback) {
    this.onUserChanged = callback;
  }

  validateEmail(email) {
    
  }

  addUser(email, name, password, confirmPassword) {
    const user = {
      email,
      name,
      password,
      confirmPassword,
    };
    this.user = user;
    this.onUserChanged(this.user);
  }
}
