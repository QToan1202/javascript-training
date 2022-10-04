import LoginController from '../controllers/login';
import UserList from '../models/userList';
import LoginView from '../views/login';

new LoginController(new UserList(), new LoginView());
