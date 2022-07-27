export default class User {
  constructor(email, name, password, confirmPassword) {
    this.email = email;
    this.name = name;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }
}
