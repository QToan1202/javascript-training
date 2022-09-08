export default class User {
  constructor(userName, password) {
    this.userName = userName;
    this.password = password;
    this.avatar = `https://picsum.photos/id/${Math.round(Math.random() * 1000) + 1}/200`;
  }
}
