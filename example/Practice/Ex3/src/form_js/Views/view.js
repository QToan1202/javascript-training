export default class View {
  constructor() {
    // Form
    this.form = document.getElementById('js-form');

    // Input
    this.emailInput = document.getElementById('js-email');
    this.nameInput = document.getElementById('js-name');
    this.passwordInput = document.getElementById('js-password');
    this.confirmPasswordInput = document.getElementById('js-confirm-password');

    // Error
    this.errorEmail = document.getElementById('js-email-error');
    this.errorName = document.getElementById('js-name-error');
    this.errorPassword = document.getElementById('js-password-error');
    this.errorConfirmPassword = document.getElementById('js-confirm-password-error');

    // Button
    this.btnReset = document.getElementById('js-reset-button');
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  get userEmail() {
    return this.emailInput.value.trim();
  }

  get userName() {
    return this.nameInput.value.trim();
  }

  get userPassword() {
    return this.passwordInput.value;
  }

  get userConfirmPassword() {
    return this.confirmPasswordInput.value;
  }

  resetForm() {
    this.form.reset();
  }

  /**
   * Display user information and errors
   * @param {object} user
   * @param {array} error
   */
  displayData(user, error) {
    // Remove the information paragraph
    if (this.form.parentElement.lastElementChild.tagName === 'DIV') this.form.parentElement.lastElementChild.remove();

    // Show error
    if (Object.keys(error).length) {
      this.errorEmail.textContent = error.errorEmail;
      this.errorName.textContent = error.errorName;
      this.errorPassword.textContent = error.errorPassword;
      this.errorConfirmPassword.textContent = error.errorConfirmPassword;
    }

    // Show user information after submit successfull
    if (Object.keys(user).length) {
      this.resetForm();
      const information = this.createElement('div');
      information.innerHTML = `
      <p>Email: ${user.email}</p>
      <p>Username: ${user.name}</p>
      <p>Password: ${user.password}</p>
      <p>Confirm Password: ${user.confirmPassword}</p>
      `;
      this.form.parentElement.append(information);
    }
  }

  /**
   * Add event for input to clear error when changed
   */
  addEventInputChanged() {
    this.emailInput.addEventListener('input', () => {
      this.errorEmail.textContent = '';
    });

    this.nameInput.addEventListener('input', () => {
      this.errorName.textContent = '';
    });

    this.passwordInput.addEventListener('input', () => {
      this.errorPassword.textContent = '';
    });

    this.confirmPasswordInput.addEventListener('input', () => {
      this.errorConfirmPassword.textContent = '';
    });
  }

  bindAddUser(handler) {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();

      handler(
        this.userEmail,
        this.userName,
        this.userPassword,
        this.userConfirmPassword,
      );
    });
  }

  resetAll() {
    this.btnReset.addEventListener('click', () => this.resetForm());
  }
}
