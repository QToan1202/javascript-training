export default class ControllerLogin {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.init();
  }

  init = async () => {
    this.view.bindLoginUser(this.handlerLoginUser);
    this.view.renderForm();
    this.view.bindCreateAccount(this.handlerCreateAccount);
    await this.model.getUsers();
  };

  handlerLoginUser = async (userName, password) => {
    const hasLogin = await this.model.loginUser(userName, password);
    this.view.redirectToHome(hasLogin);
  };

  handlerCreateAccount = async (userName, password) => {
   const isSuccess = await this.model.createAccount(userName, password);
   this.view.alertError(isSuccess);
   this.view.redirectToHome(isSuccess);
  };
}
