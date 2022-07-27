import { regEmail, regName, regPass } from '../regex';
import User from './user';

export default class Model {
  constructor() {
    this.user = {};
    this.error = {};
  }

  bindDataChanged(callback) {
    this.onDataChanged = callback;
  }

  /**
   * Validation form
   * @param {string} email
   * @param {string} name
   * @param {string} password
   * @param {string} confirmPassword
   */
  validationForm(email, name, password, confirmPassword) {
    // Reset obj for another validate
    this.error = {};
    this.user = {};

    // Validate Email
    if (!regEmail.test(email)) this.error.errorEmail = 'Email is required and must be at the right format';

    // Validate Name
    if (!regName.test(name)) this.error.errorName = 'Name is requied and not accept any number or special characters';

    // Validate Password
    if (!regPass.test(password)) this.error.errorPassword = 'Password is required and must have at least one number and special character';

    // Checking if Confirm Password and Password is match or not
    if (password !== confirmPassword) this.error.errorConfirmPassword = "Don't match password";
    this.onDataChanged(this.user, this.error);
  }

  /**
   * Add new user if don't have any error in validate process
   * @param {string} email
   * @param {string} name
   * @param {string} password
   * @param {string} confirmPassword
   */
  addUser(email, name, password, confirmPassword) {
    // Validate before execute adding process
    this.validationForm(email, name, password, confirmPassword);
    if (!Object.keys(this.error).length) {
      this.user = new User(email, name, password, confirmPassword);
      this.onDataChanged(this.user, this.error);
    }
  }
}
