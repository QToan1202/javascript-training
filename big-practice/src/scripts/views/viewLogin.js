import RegisterForm from '../templates/registerForm';

export default class ViewLogin {
  constructor() {
    this.form = document.querySelector('form');
    this.userName = document.getElementById('js-user-name');
    this.password = document.getElementById('js-user-password');
  }

  bindLoginUser(handler) {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      handler(this.userName.value, this.password.value);
    });
  }

  redirectToHome() {
    window.location.replace('https://www.facebook.com/');
  }
}
