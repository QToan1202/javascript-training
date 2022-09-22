export default class loginController {
  constructor(userModel, loginView) {
    this.userModel = userModel;
    this.loginView = loginView;

    this.init();
  }

  init = async () => {
    this.userModel.bindErrorOccurred(this.onErrorOccurred);

    this.loginView.bindLoginUser(this.handleLoginUser);
    this.loginView.renderForm();
    this.loginView.bindCreateAccount(this.handleCreateAccount);
    await this.userModel.getUsers();
  };

  onErrorOccurred = (error) => {
    this.loginView.showError(error);
  }

  handleLoginUser = async (userName, password) => {
    const hasLogin = await this.userModel.loginUser(userName, password);
    
    this.loginView.redirectToHome(hasLogin);
  };

  handleCreateAccount = async (userName, password) => {
   const isSuccess = await this.userModel.createAccount(userName, password);

   this.loginView.existUser(isSuccess);
   this.loginView.redirectToHome(isSuccess);
  };
}
