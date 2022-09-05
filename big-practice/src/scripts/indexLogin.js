import ControllerLogin from './controllers/controllerLogin';
import ModelUser from './models/modelUser';
import LoginView from './views/loginView';

const app = new ControllerLogin(new ModelUser(), new LoginView());
