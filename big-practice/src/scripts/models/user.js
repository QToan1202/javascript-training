import avatar from '../utilities/avatar';

export default class User {
  constructor(userName, password) {
    this.userName = userName;
    this.password = password;
    this.avatar = avatar();
  }
}
