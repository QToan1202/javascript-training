import Model from './Models/model';
import View from './Views/view';
import Controller from './Controllers/controller';

const app = new Controller(new Model(), new View());
