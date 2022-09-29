import { BASE_URL } from '../constants/url';
import MESSAGES from '../constants/messages';
import Storage from '../utilities/storageHelper';
import FlashMessage from '../utilities/flashMessage';

export default class LoginView {
  constructor() {
    this.form = document.querySelector('form');
    this.userName = document.getElementById('js-user-name');
    this.password = document.getElementById('js-user-password');
    this.confirmPassLabel = document.getElementById('js-label-confirm-password');
    this.confirmPassword = document.getElementById('js-user-confirm-password');
  }

  /**
   * Add submit event to form login
   * @param {Function} handler
   */
  bindLoginUser(handler) {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();

      // Check if all field have been entered
      if (!this.userName.value || !this.password.value) {
        this.showError(MESSAGES.REQUIRED);
        return;
      }

      // Not in register mode
      if (this.confirmPassword.classList.contains('hidden')) handler(this.userName.value, this.password.value);
    });
  }

  /**
   * Handling create account
   * @param {Function} handler
   */
  bindCreateAccount(handler) {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();

      // In register mode
      if (!this.confirmPassword.classList.contains('hidden')) {
        // Check empty password
        if (!this.password.value) {
          this.showError(MESSAGES.EMPTY_PASSWORD);
          return;
        }

        // Check password and confirm password matched
        if (this.confirmPassword.value !== this.password.value) {
          this.showError(MESSAGES.PASSWORD);
          this.confirmPassword.value = '';
          return;
        }

        handler(this.userName.value, this.password.value);
      }
    });
  }

  /**
   * Alert when register with the same existed userName
   * @param {Boolean} hasUser
   */
  existUser(hasUser) {
    if (!hasUser) this.showError(`Users ${this.userName.value} has registered before`);
  }

  /**
   * Redirect to dashboard if login success
   * @param {Boolean} loginSuccess
   */
  redirectToHome(loginSuccess) {
    if (loginSuccess) {
      window.location.replace(BASE_URL);
      Storage.setData('hasLogin', loginSuccess)
      return;
    }

    // Login mode: When login what show the alert
    if (this.confirmPassword.classList.contains('hidden')) this.showError(MESSAGES.LOGIN_FAIL);
    this.password.value = '';
  }

  /**
   * Render a form that can change between login/register mode
   */
  renderForm() {
    const linkRegisterForm = document.getElementById('js-register-form');

    linkRegisterForm.addEventListener('click', () => {
      const submitBtn = document.querySelector('button[type=submit]');

      this.confirmPassLabel.classList.toggle('hidden');
      this.confirmPassword.classList.toggle('hidden');

      // Form in register mode
      if (!this.confirmPassword.classList.contains('hidden')) {
        linkRegisterForm.textContent = 'Have account?';
        submitBtn.textContent = 'Ok';
        return;
      }

      linkRegisterForm.textContent = 'Create new account';
      submitBtn.textContent = 'Login';
    });
  }

  /**
   * Create an flash message error 
   * @param {String} error 
   */
   showError(error) {
    FlashMessage.showMessage(error)
  }
}
