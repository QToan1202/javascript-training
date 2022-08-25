import ControllerLogin from './controllers/controllerLogin';
import ModelUser from './models/modelUser';
import ViewLogin from './views/viewLogin';

const app = new ControllerLogin(new ModelUser(), new ViewLogin());
