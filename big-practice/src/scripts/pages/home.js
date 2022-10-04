import TaskController from '../controllers/task';
import CommentList from '../models/commentList';
import TaskList from '../models/taskList';
import ModalDetail from '../views/modalDetail';
import TaskView from '../views/task';

new TaskController(new TaskList(), new CommentList(), new TaskView(), new ModalDetail());
