export default class ControllerLogin {
  constructor(userModel, loginView) {
    this.userModel = userModel;
    this.loginView = loginView;

    this.init();
  }

  init = async () => {
    this.loginView.bindLoginUser(this.handlerLoginUser);
    this.loginView.renderForm();
    this.loginView.bindCreateAccount(this.handlerCreateAccount);
    await this.userModel.getUsers();
  };

  handlerLoginUser = async (userName, password) => {
    const hasLogin = await this.userModel.loginUser(userName, password);
    this.loginView.redirectToHome(hasLogin);
  };

  handlerCreateAccount = async (userName, password) => {
   const isSuccess = await this.userModel.createAccount(userName, password);
   this.loginView.alertError(isSuccess);
   this.loginView.redirectToHome(isSuccess);
  };
}
