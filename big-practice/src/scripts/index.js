import Controller from './controllers/controller';
import Model from './models/model';
import ModalDetail from './views/modalDetail';
import TaskView from './views/taskView';

const app = new Controller(new Model(), new TaskView(), new ModalDetail());
