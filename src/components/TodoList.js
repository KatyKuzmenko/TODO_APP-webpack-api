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
    const activeTodos = Store.state.todos.filter((todo) => !todo.completed);
    const completedTodos = Store.state.todos.filter((todo) => todo.completed);
    const filteredTodos = {
      all: Store.state.todos,
      active: activeTodos,
      completed: completedTodos,
    };

    const visibleTodos = filteredTodos[Store.state.filterType];
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
              ${Store.state.filterType === 'all' ? 'class="selected"' : ''}
            >All</a>
          </li>
          <li>
            <a
              data-type="filter"
              data-filter="active"
              href="#/active"
              ${Store.state.filterType === 'active' ? 'class="selected"' : ''}
            >Active</a>
          </li>
          <li>
            <a
              data-type="filter"
              data-filter="completed"
              href="#/completed"
              ${Store.state.filterType === 'completed' ? 'class="selected"' : ''}
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
        ${Store.state.todos.length > 0 ? `
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
        Store.state.todos.forEach((todo) => {
          todo.completed = event.target.checked;
        });
        this.render(Store.state.todos);
      });
    }

    todoTogglers.forEach((toggler) => {
      toggler.addEventListener('change', (event) => {
        const selectedTodo = Store.state.todos
          .find((todo) => todo.id === +event.target.dataset.inputId);
        selectedTodo.completed = event.target.checked;
        this.render(Store.state.todos);
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
        Store.state.id = +event.target.dataset.destroyId;
        const modalWindow = this.root.querySelector('.modal');

        modalWindow.classList.add('modal--active', `modal${+event.target.dataset.destroyId}`);
      });
    });

    editInput.forEach((edit) => {
      edit.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' || !event.target.value.trim()) {
          return;
        }

        const selectedTodo = Store.state.todos.find((todo) => todo.id === +event.target.id);

        selectedTodo.title = event.target.value;
        this.render(Store.state.todos);
      });

      edit.addEventListener('blur', (event) => {
        if (!event.target.value.trim()) {
          return;
        }

        const selectedTodo = Store.state.todos.find((todo) => todo.id === +event.target.id);

        selectedTodo.title = event.target.value;
        this.render(Store.state.todos);
      });
    });

    filterLinks.forEach((filter) => {
      filter.addEventListener('click', (event) => {
        Store.state.filterType = event.target.dataset.filter;
        this.render(Store.state.todos);
      });
    });

    if (clearCompletedButton) {
      clearCompletedButton.addEventListener('click', () => {
        Store.state.todos = Store.state.todos.filter((todo) => !todo.completed);
        this.render(Store.state.todos);
      });
    }

    closeModalButton.addEventListener('click', () => {
      const modalWindow = this.root.querySelector(`.modal${Store.state.id}`);

      modalWindow.classList.remove('modal--active', `modal${Store.state.id}`);
    });

    deleteModalButton.addEventListener('click', () => {
      const modalWindow = this.root.querySelector(`.modal${Store.state.id}`);
      modalWindow.classList.remove('modal--active', `modal${Store.state.id}`);
      Store.state.todos = Store.state.todos.filter((todo) => todo.id !== Store.state.id);
      this.render(Store.state.todos);
    });

    cancelModalButton.addEventListener('click', () => {
      const modalWindow = this.root.querySelector(`.modal${Store.state.id}`);

      modalWindow.classList.remove('modal--active', `modal${Store.state.id}`);
    });
  }
}

const todoList = new TodoList();
