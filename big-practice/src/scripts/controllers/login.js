export default class loginController {
  constructor(userList, loginView) {
    this.userList = userList;
    this.loginView = loginView;

    this.init();
  }

  init = async () => {
    this.userList.bindErrorOccurred(this.handleErrorOccurred);
    this.loginView.bindLoginUser(this.handleLoginUser);
    this.loginView.renderForm();
    this.loginView.bindCreateAccount(this.handleCreateAccount);
    await this.userList.get();
    this.loginView.clearErrorMsg();
  };

  /**
   * Show error for end user
   * @param {String} error 
   */
  handleErrorOccurred = (error) => {
    this.loginView.showError(error);
  }

  /**
   * Login user and redirect to home if success
   * @param {String} userName 
   * @param {String} password 
   */
  handleLoginUser = async (userName, password) => {
    const hasLogin = await this.userList.login(userName, password);
    
    this.loginView.redirectToHome(hasLogin);
  };

  /**
   * Send user in formation from View to userList to add new user
   * @param {String} userName 
   * @param {String} password 
   */
  handleCreateAccount = async (userName, password) => {
   const isSuccess = await this.userList.add(userName, password);

   this.loginView.existUser(isSuccess);
   this.loginView.redirectToHome(isSuccess);
  };
}
