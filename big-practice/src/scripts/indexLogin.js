import LoginController from './controllers/loginController';
import ModelUser from './models/modelUser';
import LoginView from './views/loginView';

const app = new LoginController(new ModelUser(), new LoginView());
