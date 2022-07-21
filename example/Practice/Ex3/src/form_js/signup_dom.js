import Controller from './Controllers/controller';
import Model from './Models/model';
import View from './Views/view';

const app = new Controller(new Model(), new View());
