import Component from '../utils/Component';
import Store from '../utils/Store';
import Todo from './Todo';

class NewTodoInput extends Component {
  constructor() {
    super();
    this.root = document.querySelector('.todoapp');
  }

  render() {
    const header = document.createElement('header');
    header.className = 'header';

    const appTitle = document.createElement('h1');
    appTitle.innerText = 'todos';

    const todoInput = document.createElement('input');
    todoInput.className = 'new-todo';
    todoInput.placeholder = 'What needs to be done?';

    header.appendChild(appTitle);
    header.appendChild(todoInput);

    todoInput.addEventListener('keydown', this.addTodo());

    todoInput.focus();
  }

  addTodo(event) {
    if (!event.target.value || event.key !== 'Enter') {
      return;
    }

    Store.state.todos.push(new Todo(event.target.value));
    this.render();
  }
}

const mainInput = new NewTodoInput();
