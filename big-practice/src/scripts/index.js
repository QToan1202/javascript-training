import Controller from './controllers/controller';
import Model from './models/model';
import ModalView from './views/modalView';
import TaskView from './views/taskView';

const app = new Controller(new Model(), new TaskView(), new ModalView);
