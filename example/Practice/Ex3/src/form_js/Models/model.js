export default class Model {
  constructor() {
    this.user = {};
    this.error = {};
    // Allow special character + @ + domain
    this.regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // Allow upper and lower case letter, space
    this.regName = /^[A-Za-z ]+$/;
    // Have at least 1 number, 1 special character and in the range from 6 to 16 characters
    this.regPass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  }

  bindDataChanged(callback) {
    this.onDataChanged = callback;
  }

  validationForm(email, name, password, confirmPassword) {
    // Reset obj for another validate
    this.error = {};
    this.user = {};

    // Validate Email
    if (!this.regEmail.test(email)) {
      this.error.errorEmail = 'Email is required and must be at the right format';
    }

    // Validate Name
    if (!this.regName.test(name)) {
      this.error.errorName = 'Name is requied and not accept any number or special characters';
    }

    // Validate Password
    if (!this.regPass.test(password)) {
      this.error.errorPassword = 'Password is required and must have at least one number and special character';
    }

    // Checking if Confirm Password and Password is match or not
    this.checkConfirmPassword(password, confirmPassword);
    this.onDataChanged(this.user, this.error);
  }

  checkConfirmPassword(password, confirmPassword) {
    if (password !== confirmPassword) {
      this.error.errorConfirmPassword = 'Don\'t match password';
    }
  }

  // Adding a user
  addUser(email, name, password, confirmPassword) {
    // Validate before execute adding process
    this.validationForm(email, name, password, confirmPassword);
    if (Object.keys(this.error).length === 0) {
      const user = {
        email,
        name,
        password,
        confirmPassword,
      };
      this.user = user;
      this.onDataChanged(this.user, this.error);
    }
  }
}
