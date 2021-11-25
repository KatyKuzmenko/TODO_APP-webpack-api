import Component from '../utils/Component';
import '../style.css';
import Store from '../utils/Store';

export default class TodoList extends Component {
  constructor() {
    super();
    this.root = document.querySelector('.list');
  }

  render() {
    super.render();
    const root = document.querySelector('.todoapp');

    // main
    const main = document.createElement('section');
    main.className = 'main';

    const toggleAllContainer = document.createElement('span');
    toggleAllContainer.className = 'toggle-all-container';

    const toggleAllCheckbox = document.createElement('input');
    toggleAllCheckbox.id = 'toggle-all';
    toggleAllCheckbox.className = 'toggle-all';
    toggleAllCheckbox.type = 'checkbox';
    toggleAllCheckbox.checked = false;

    const toggleAllLabel = document.createElement('label');
    toggleAllLabel.htmlFor = 'toggle-all';

    const list = document.createElement('ul');
    list.className = 'todo-list';

    root.appendChild(main);
    main.appendChild(toggleAllContainer);
    toggleAllContainer.appendChild(toggleAllCheckbox);
    toggleAllContainer.appendChild(toggleAllLabel);
    toggleAllContainer.appendChild(list);

    const toggleAllCh = document.querySelector('.toggle-all');
    const todoTogglers = document.querySelectorAll('.toggle');
    const todoTitle = document.querySelectorAll('.todo-title');
    const destroyButton = document.querySelectorAll('.destroy');
    const editInput = document.querySelectorAll('.edit-field');
    const filterLinks = document.querySelectorAll('[data-type="filter"]');
    const clearCompletedButton = document.querySelector('.clear-completed');

    if (toggleAllCh) {
      toggleAllCh.addEventListener('change', this.toggleAll());
    }

    todoTogglers.forEach((toggler) => {
      toggler.addEventListener('change', this.toggleTodo());
    });

    todoTitle.forEach((title) => {
      title.addEventListener('dblclick', this.editTitle());
    });

    destroyButton.forEach((button) => {
      button.addEventListener('click', this.openModalWindow());
    });

    editInput.forEach((edit) => {
      edit.addEventListener('keydown', this.setNewTitleOnEnter());

      edit.addEventListener('blur', this.setNewTitleOnBlur());
    });

    filterLinks.forEach((filter) => {
      filter.addEventListener('click', this.setFilter());

      if (clearCompletedButton) {
        clearCompletedButton.addEventListener('click', this.clearCompleted());
      }
    });
  }

  toggleAll(completed) {
    Store.state.todos.forEach((todo) => {
      todo.completed = completed;
    });
    this.render(Store.state.todos);
  }

  toggleTodo(event) {
    const selectedTodo = Store.state.todos
      .find((todo) => todo.id === +event.target.dataset.inputId);
    selectedTodo.completed = event.target.checked;
    this.render(Store.state.todos);
  }

  editTitle(event) {
    const todoId = +event.target.dataset.labelId;
    const editTodo = document.querySelector(`.edit${todoId}`);
    const todoItem = document.querySelector(`.view${todoId}`);
    editTodo.className = `edit-field edit${todoId}`;
    todoItem.classList.add('invisible');
    editTodo.focus();
    editTodo.selectionStart = editTodo.value.length;
    this.render();
  }

  openModalWindow(event) {
    this.id = +event.target.dataset.destroyId;
    const modalWindow = document.querySelector('.modal');

    modalWindow.classList.add('modal--active', `modal${+event.target.dataset.destroyId}`);
  }

  setNewTitleOnEnter(event) {
    if (!event.target.value.trim() || !event.key === 'Enter') {
      return;
    }

    const selectedTodo = Store.state.todos.find((todo) => todo.id === +event.target.id);
    selectedTodo.title = event.target.value;
    this.render(Store.state.todos);
  }

  setNewTitleOnBlur(event) {
    if (!event.target.value.trim()) {
      return;
    }

    const selectedTodo = Store.state.todos.find((todo) => todo.id === +event.target.id);
    selectedTodo.title = event.target.value;
    this.render(Store.state.todos);
  }

  setFilter(event) {
    Store.state.filterType = event.target.dataset.filter;
    this.render(Store.state.todos);
  }

  clearCompleted() {
    Store.state.todos = Store.state.todos.filter((todo) => !todo.completed);
    this.render(Store.state.todos);
  }
}

const todoList = new TodoList();
