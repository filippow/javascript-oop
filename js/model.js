
export default class Model {
    constructor( todos = []) {
        this.todos = todos;
    }

    getIndex(id) {
        return this.todos.findIndex( todo => todo.id == id);
    }

    add(todo) {
        this.todos.push(todo);
    }

    delete(id) {
       let index = this.getIndex(id); 
       if (index>-1) {
           this.todos.splice(index,1);
       }
    }

    change(todo) {
        let index = this.getIndex(todo.id);
        this.todos[index].completed = todo.completed;
        this.todos[index].title= todo.title;    
    }

}