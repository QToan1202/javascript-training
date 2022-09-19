import LoginController from './controllers/loginController';
import UserModel from './models/userModel';
import LoginView from './views/loginView';

const app = new LoginController(new UserModel(), new LoginView());
