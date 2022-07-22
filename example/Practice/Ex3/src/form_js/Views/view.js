export default class View {
  constructor() {
    // Form
    this.form = document.getElementById('form');

    // Input
    this.email = document.getElementById('email');
    this.name = document.getElementById('name');
    this.password = document.getElementById('password');
    this.confirmPassword = document.getElementById('confirm-password');

    // Error
    this.errorEmail = document.getElementById('email-error');
    this.errorName = document.getElementById('name-error');
    this.errorPassword = document.getElementById('password-error');
    this.errorConfirmPassword = document.getElementById('confirm-password-error');

    // Button
    this.btnReset = document.getElementById('reset-button');
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  get userEmail() {
    return this.email.value.trim();
  }

  get userName() {
    return this.name.value.trim();
  }

  get userPassword() {
    return this.password.value;
  }

  get userConfirmPassword() {
    return this.confirmPassword.value;
  }

  resetForm() {
    this.form.reset();
  }

  displayData(user, error) {
    // Remove the information paragraph display a new one
    if (this.form.parentElement.lastElementChild.tagName === 'DIV') this.form.parentElement.lastElementChild.remove();

    // Show error
    if (Object.keys(error).length !== 0) {
      this.errorEmail.textContent = error.errorEmail;
      this.errorName.textContent = error.errorName;
      this.errorPassword.textContent = error.errorPassword;
      this.errorConfirmPassword.textContent = error.errorConfirmPassword;
    } else {
      this.errorEmail.textContent = '';
      this.errorName.textContent = '';
      this.errorPassword.textContent = '';
      this.errorConfirmPassword.textContent = '';
    }

    // Show user information after submit successfull
    if (Object.keys(user).length !== 0) {
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

  bindAddUser(handler) {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();

      handler(
        this.userEmail,
        this.userName,
        this.userPassword,
        this.userConfirmPassword,
      );
      this.resetForm();
    });
  }

  resetAll() {
    this.btnReset.addEventListener('click', () => this.resetForm());
  }
}
