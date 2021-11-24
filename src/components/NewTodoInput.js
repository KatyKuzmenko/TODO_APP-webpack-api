import Todo from './Todo';
import TodoList from './TodoList';
import Component from '../utils/Component';
import Store from '../utils/Store';

class NewTodoInput extends Component {
  constructor() {
    super();
    this.root = document.querySelector('.adding');
    this.render();
  }

  render() {
    const header = `
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          placeholder="What needs to be done?"
        >
      </header>
    `;

    this.root.innerHTML = header;

    const newTodoInput = document.querySelector('.new-todo');
    if (newTodoInput) {
      newTodoInput.addEventListener('keydown', (event) => {
        if (!event.target.value || event.key !== 'Enter') {
          return;
        }

        Store.state.todos.push(new Todo(event.target.value));
        new TodoList().render(Store.state.todos);
        new Todo().render();
        this.render();
      });
    }

    const input = this.root.querySelector('.new-todo');
    input.focus();
  }
}

const header = new NewTodoInput();
