import RegisterForm from '../templates/registerForm';
import constant from '../utilities/constant';

export default class LoginView {
  constructor() {
    this.form = document.querySelector('form');
    this.userName = document.getElementById('js-user-name');
    this.password = document.getElementById('js-user-password');
    this.hasLogin = sessionStorage.getItem('hasLogin') || false;
  }

  bindLoginUser(handler) {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      handler(this.userName.value, this.password.value);
    });
  }

  redirectToHome(hasLogin) {
    if (hasLogin) {
      window.location.replace(constant.BASE_URL);
      sessionStorage.setItem('hasLogin', JSON.stringify(hasLogin));
      return;
    }

    alert('Wrong username or password');
  }
}
