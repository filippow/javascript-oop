export default class View {
    constructor(model,controller) {
        this.model = model;
        this.controller = controller;
        this.currentInput = '';

        this.init();
    }

    init() {
        this.todoList = document.querySelector('#todo-list');
        this.addInput = document.querySelector('#add-input');
        this.addInput.addEventListener('input', this.handleInput.bind(this));
        
        document.querySelector('#add-button')
            .addEventListener('click', this.handleAdd.bind(this));   
    }

    handleInput({target}) {
        this.currentInput = target.value;
        if (this.currentInput) {
            document.querySelector('#add-input').style.borderColor = '';
        } else {
            document.querySelector('#add-input').style.borderColor = 'red';
        }
    }

    handleAdd(event) {
        event.preventDefault();
        if (this.currentInput) {
            this.controller.add(this.currentInput);
            
        }  else {
            alert('Введите название дела')
        }
    }

    addTodo(todo) {
        let elem = this.createDomTodo(todo);
        this.todoList.appendChild(elem);
        this.addInput.value = '';
        this.currentInput = '';
    }

    handleDelete({target}) {
        let todoId = target.parentNode.dataset.id;

        this.controller.delete(todoId);
        this.findElemById(todoId).remove();
    }

    findElemById(id) {
        return this.todoList.querySelector(`[data-id="${id}"]`); 
    }

    handleEdit({target}) {
        let li = target.parentNode;
        let button = target;
        
        li.classList.toggle('editing');
       
        if (li.classList.contains('editing')) {
            button.textContent = 'Сохранить';
        } else {
            button.textContent = 'Изменить';
            this.controller.change({
                id:li.dataset.id, 
                title: li.querySelector('.textfield').value, 
                completed: li.querySelector('.checkbox').checked
            });
        }
    }

    update(todo) {
        let elem = this.findElemById(todo.id);
        elem.querySelector('.checkbox').checked = todo.completed;
        elem.querySelector('.title').textContent = todo.title;
    }

    handleCheckboxChange({target}) {
        let li =  target.parentNode;

        li.classList.toggle('completed');
    
        this.controller.change({
            id: li.dataset.id,
            title: li.querySelector('.title').textContent,
            completed: target.checked
        });
    }

    createDomTodo(todo) {
        let textNode = this.createElement('span', {className: 'title', textContent: todo.title});
        let textfield = this.createElement('input',{className:'textfield', value: todo.title});           
        let checkbox = this.createElement('input', {className: 'checkbox', type: 'checkbox'});
            checkbox.addEventListener('change', this.handleCheckboxChange.bind(this));

        let deleteButton = this.createElement('button',{textContent: 'Удалить'})
            deleteButton.addEventListener('click', this.handleDelete.bind(this));

        let editButton = this.createElement('button',{textContent: 'Изменить'})
            editButton.addEventListener('click', this.handleEdit.bind(this));
        
        let elem = this.createElement('li', {className: 'todo-item','data-id': todo.id}, checkbox,textNode,textfield,editButton,deleteButton);

        return elem
    }

    createElement(tag,props,...children) { 
        let elem = document.createElement(tag);
        
        for (let key in props) {
            if (key === 'data-id') {
                elem.setAttribute('data-id',props[key]);
            } else {
                if (props.hasOwnProperty(key)) {
                    elem[key] = props[key];
                }
            }
        }
        children.forEach( item => {
            elem.appendChild(item);
        })

        return elem
    }
}