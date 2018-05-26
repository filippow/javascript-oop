export default class Controller {
    init(view, model) {
        this.view = view;
        this.model = model;
    }

    add(title) {
        let todo = {
            id: Date.now(),
            title: title,
            completed: false
        };
        
        this.view.addTodo(todo);
        this.model.add(todo);
    }

    delete(id) {
        this.model.delete(id);
    }

    change(todo) {
        this.model.change(todo);
        this.view.update(todo);
    }

}