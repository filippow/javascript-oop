import Model from './model.js';
import View from './view.js';
import Controller from './controller.js';

let model = new Model();
let controller = new Controller();
let view = new View(model, controller);
controller.init(view, model);



