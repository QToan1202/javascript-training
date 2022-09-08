export default class ControllerLogin {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.init();
  }

  init = async () => {
    this.view.bindLoginUser(this.handlerLoginUser);
    await this.model.getUsers();
  };

  handlerLoginUser = async (userName, password) => {
    const hasLogin = await this.model.loginUser(userName, password);
    this.view.redirectToHome(hasLogin);
  };
}
