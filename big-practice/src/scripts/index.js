import Controller from './controllers/controllerTask';
import TaskModel from './models/taskModel';
import ModalDetail from './views/modalDetail';
import TaskView from './views/taskView';

const app = new Controller(new TaskModel(), new TaskView(), new ModalDetail());
