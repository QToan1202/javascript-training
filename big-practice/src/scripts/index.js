import TaskController from './controllers/taskController';
import TaskModel from './models/taskModel';
import ModalDetail from './views/modalDetail';
import TaskView from './views/taskView';

new TaskController(new TaskModel(), new TaskView(), new ModalDetail());
