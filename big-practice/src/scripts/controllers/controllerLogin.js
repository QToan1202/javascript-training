export default class ControllerLogin {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindLoginUser(this.handlerLoginUser);
  }

  handlerLoginUser = async (userName, password) => {
    const hasLogin = await this.model.loginUser(userName, password);
    if (hasLogin) this.view.redirectToHome();
  };
}
