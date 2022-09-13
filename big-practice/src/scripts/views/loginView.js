import { BASE_URL } from '../utilities/constant';

export default class LoginView {
  constructor() {
    this.form = document.querySelector('form');
    this.userName = document.getElementById('js-user-name');
    this.password = document.getElementById('js-user-password');
    this.confirmPassLabel = document.getElementById('js-label-confirm-password');
    this.confirmPassword = document.getElementById('js-user-confirm-password');
    this.hasLogin = sessionStorage.getItem('hasLogin') || false;
  }

  bindLoginUser(handler) {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (this.confirmPassword.classList.contains('hidden')) handler(this.userName.value, this.password.value);
    });
  }

  bindCreateAccount(handler) {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!this.confirmPassword.classList.contains('hidden')) {
        if (this.confirmPassword.value !== this.password.value) {
          alert('Password don\'t match');
          this.confirmPassword.value = '';
          return;
        }

        handler(this.userName.value, this.password.value);
      }
    });
  }

  alertError(hasError) {
    if (!hasError) alert(`Users ${this.userName.value} has registered before`);
  }

  redirectToHome(hasLogin) {
    if (hasLogin) {
      window.location.replace(BASE_URL);
      sessionStorage.setItem('hasLogin', JSON.stringify(hasLogin));
      return;
    }

    if (this.confirmPassword.classList.contains('hidden')) alert('Wrong username or password');
  }

  renderForm() {
    const linkRegisterForm = document.getElementById('js-register-form');

    linkRegisterForm.addEventListener('click', () => {
      const submitBtn = document.querySelector('button[type=submit]');

      this.confirmPassLabel.classList.toggle('hidden');
      this.confirmPassword.classList.toggle('hidden');
      if (!this.confirmPassword.classList.contains('hidden')) {
        linkRegisterForm.textContent = 'Have account?';
        submitBtn.textContent = 'Ok';
        return;
      }

      linkRegisterForm.textContent = 'Create new account';
      submitBtn.textContent = 'Login';
    });
  }
}
