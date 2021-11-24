import Component from './Component';
import './style.css';

export default class TodoList extends Component {
  constructor() {
    super();
    this.root = document.querySelector('.list');
    this.filterType = 'all';
  }

  render() {
    const activeTodos = Component.todos.filter((todo) => !todo.completed);
    const completedTodos = Component.todos.filter((todo) => todo.completed);
    const filteredTodos = {
      all: Component.todos,
      active: activeTodos,
      completed: completedTodos,
    };

    const visibleTodos = filteredTodos[this.filterType];
    const main = `
      <section class="main">
        <span class="toggle-all-container">
          <input
            id="toggle-all"
            class="toggle-all"
            type="checkbox"
            ${activeTodos.length === 0 ? 'checked' : ''}
          >

          <label for="toggle-all"></label>

          <ul class="todo-list">
            ${visibleTodos.map((todo) => `
              <li
                class="todo-list__item ${todo.completed ? 'completed' : ''}"
                data-todo-id="${todo.id}"
              >
                <div class="view${todo.id}">
                  <input
                    id="todo-${todo.id}"
                    data-input-id="${todo.id}"
                    class="toggle"
                    type="checkbox"
                    ${todo.completed ? 'checked' : ''}
                  >
                  <label
                    data-label-id="${todo.id}"
                    class="todo-title"
                  >${todo.title}</label>
                    
                  <button
                    data-destroy-id="${todo.id}"
                    class="destroy"
                  ></button>
                </div>
                
                <input
                  class="edit-field edit${todo.id} invisible"
                  id="${todo.id}"
                  type="text"
                  value="${todo.title}"
                >
              </li>  
            `).join('')}
          </ul>
        </span>
      </section>
    `;

    const footer = `
      <footer class="footer">
        <span class="todo-count">
          ${activeTodos.length} items left
        </span>
        <ul class="filters">
          <li>
            <a
              data-type="filter"
              data-filter="all"
              href="#/"
              ${this.filterType === 'all' ? 'class="selected"' : ''}
            >All</a>
          </li>
          <li>
            <a
              data-type="filter"
              data-filter="active"
              href="#/active"
              ${this.filterType === 'active' ? 'class="selected"' : ''}
            >Active</a>
          </li>
          <li>
            <a
              data-type="filter"
              data-filter="completed"
              href="#/completed"
              ${this.filterType === 'completed' ? 'class="selected"' : ''}
            >Completed</a>
          </li>
        </ul>
        ${completedTodos.length > 0 ? `
          <button
            class="clear-completed"
          >
            Clear completed
          </button>
        ` : ''} 
      </footer>
    `;

    const modal = `
      <div class="modal">
        <div class="modal__content">
          <button
            class="modal__close-button"
          >
          </button>

          <p class="modal__title">
            Are you sure You want to delete this task?
          </p>

          <div class="button-container">
            <button
              class="modal__button--delete"
            >Delete</button>
            <button
              class="modal__button--cancel"
            >Cancel</button>
          </div>
        </div>
      </div>
    `;

    this.root.innerHTML = `
        ${Component.todos.length > 0 ? `
          ${main}
          ${footer}
        ` : ''}
        ${modal}
    `;

    const toggleAll = document.querySelector('.toggle-all');
    const todoTogglers = document.querySelectorAll('.toggle');
    const todoTitle = document.querySelectorAll('.todo-title');
    const destroyButton = document.querySelectorAll('.destroy');
    const editInput = document.querySelectorAll('.edit-field');
    const filterLinks = document.querySelectorAll('[data-type="filter"]');
    const clearCompletedButton = document.querySelector('.clear-completed');
    const closeModalButton = document.querySelector('.modal__close-button');
    const deleteModalButton = document.querySelector('.modal__button--delete');
    const cancelModalButton = document.querySelector('.modal__button--cancel');

    if (toggleAll) {
      toggleAll.addEventListener('change', (event) => {
        Component.todos.forEach((todo) => {
          todo.completed = event.target.checked;
        });
        this.render(Component.todos);
      });
    }

    todoTogglers.forEach((toggler) => {
      toggler.addEventListener('change', (event) => {
        const selectedTodo = Component.todos
          .find((todo) => todo.id === +event.target.dataset.inputId);
        selectedTodo.completed = event.target.checked;
        this.render(Component.todos);
      });
    });

    todoTitle.forEach((title) => {
      title.addEventListener('dblclick', (event) => {
        const todoId = +event.target.dataset.labelId;
        const editTodo = this.root.querySelector(`.edit${todoId}`);
        const todoItem = this.root.querySelector(`.view${todoId}`);
        editTodo.className = `edit-field edit${todoId}`;
        todoItem.classList.add('invisible');
        editTodo.focus();
        editTodo.selectionStart = editTodo.value.length;
      });
    });

    destroyButton.forEach((button) => {
      button.addEventListener('click', (event) => {
        Component.id = +event.target.dataset.destroyId;
        const modalWindow = this.root.querySelector('.modal');

        modalWindow.classList.add('modal--active', `modal${+event.target.dataset.destroyId}`);
      });
    });

    editInput.forEach((edit) => {
      edit.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' || !event.target.value.trim()) {
          return;
        }

        const selectedTodo = Component.todos.find((todo) => todo.id === +event.target.id);

        selectedTodo.title = event.target.value;
        this.render(Component.todos);
      });

      edit.addEventListener('blur', (event) => {
        if (!event.target.value.trim()) {
          return;
        }

        const selectedTodo = Component.todos.find((todo) => todo.id === +event.target.id);

        selectedTodo.title = event.target.value;
        this.render(Component.todos);
      });
    });

    filterLinks.forEach((filter) => {
      filter.addEventListener('click', (event) => {
        this.filterType = event.target.dataset.filter;
        this.render(Component.todos);
      });
    });

    if (clearCompletedButton) {
      clearCompletedButton.addEventListener('click', () => {
        Component.todos = Component.todos.filter((todo) => !todo.completed);
        this.render(Component.todos);
      });
    }

    closeModalButton.addEventListener('click', () => {
      const modalWindow = this.root.querySelector(`.modal${Component.id}`);

      modalWindow.classList.remove('modal--active', `modal${Component.id}`);
    });

    deleteModalButton.addEventListener('click', () => {
      const modalWindow = this.root.querySelector(`.modal${Component.id}`);
      modalWindow.classList.remove('modal--active', `modal${Component.id}`);
      Component.todos = Component.todos.filter((todo) => todo.id !== Component.id);
      this.render(Component.todos);
    });

    cancelModalButton.addEventListener('click', () => {
      const modalWindow = this.root.querySelector(`.modal${Component.id}`);

      modalWindow.classList.remove('modal--active', `modal${Component.id}`);
    });
  }
}

const todoList = new TodoList();
