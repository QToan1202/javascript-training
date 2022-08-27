import Controller from './controllers/controllerTask';
import Model from './models/modelTask';
import View from './views/viewTask';

const app = new Controller(new Model(), new View());
