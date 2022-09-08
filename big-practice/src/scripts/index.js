import TaskController from './controllers/taskController';
import TaskModel from './models/taskModel';
import TaskView from './views/taskView';

const app = new TaskController(new TaskModel(), new TaskView());
