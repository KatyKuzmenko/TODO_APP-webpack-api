import Todo from './Todo';

let currentTodos = [];
let filterType = 'all';
let id;
class TodoList {
  constructor() {
    this.root = document.querySelector('.todoapp');
    this.todos = currentTodos;
    this.render(this.todos);
  }

  render() {
    const activeTodos = currentTodos.filter((todo) => !todo.completed);
    const completedTodos = currentTodos.filter((todo) => todo.completed);
    const todos = {
      all: currentTodos,
      active: activeTodos,
      completed: completedTodos,
    };

    const visibleTodos = todos[filterType];
    const header = `
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          placeholder="What needs to be done?"
          onkeydown="todoList.addTodo(event)"
        >
      </header>
    `;

    const main = `
      <section class="main">
        <span class="toggle-all-container">
          <input
            id="toggle-all"
            class="toggle-all"
            type="checkbox"
            ${activeTodos.length === 0 ? 'checked' : ''}
            onchange="todoList.toggleAll(event.target.checked)"
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
                    class="toggle"
                    type="checkbox"
                    ${todo.completed ? 'checked' : ''}
                    onchange="todoList.toggleTodo(${todo.id}, event.target.checked)"
                  >
                  <label ondblclick="todoList.editTodo(${todo.id})">${todo.title}</label>
                    
                  <button
                    class="destroy"
                    onclick="todoList.openModalWindow(${todo.id})"
                  ></button>
                </div>
                
                <input
                  class="edit-field edit${todo.id} invisible"
                  id="${todo.id}"
                  type="text"
                  value="${todo.title}"
                  onkeydown="todoList.setTitleOnKeydown(event, ${todo.id}, event.target.value)"
                  onblur="todoList.setTitleOnBlur(event, ${todo.id}, event.target.value)"
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
              href="#/"
              ${filterType === 'all' ? 'class="selected"' : ''}
              onclick="todoList.setFilterType('all')"
            >All</a>
          </li>
          <li>
            <a
              href="#/active"
              data-filter="active"
              ${filterType === 'active' ? 'class="selected"' : ''}
              onclick="todoList.setFilterType('active')"
            >Active</a>
          </li>
          <li>
            <a
              href="#/completed"
              data-filter="completed"
              ${filterType === 'completed' ? 'class="selected"' : ''}
              onclick="todoList.setFilterType('completed')"
            >Completed</a>
          </li>
        </ul>
        ${completedTodos.length > 0 ? `
          <button
            class="clear-completed"
            onclick="todoList.clearCompleted()"
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
            onclick="todoList.closeModalWindow()"
          >
          </button>

          <p class="modal__title">
            Are you sure You want to delete this task?
          </p>

          <div class="button-container">
            <button
              class="modal__button"
              onclick="todoList.deleteTodoAndCloseModalWindow()"
            >Delete</button>
            <button
              class="modal__button"
              onclick="todoList.closeModalWindow()"
            >Cancel</button>
          </div>
        </div>
      </div>
    `;

    this.root.innerHTML = `
        ${header}
        ${currentTodos.length > 0 ? `
          ${main}
          ${footer}
        ` : ''}
        ${modal}
    `;

    const input = this.root.querySelector('.new-todo');
    input.focus();
  }

  setFilterType(type) {
    filterType = type;
    this.render(this.todos);
  }

  addTodo(event) {
    if (!event.target.value || event.key !== 'Enter') {
      return;
    }

    currentTodos.push(new Todo(event.target.value));
    this.render(this.todos);
  }

  removeTodo(todoId) {
    currentTodos = currentTodos.filter((todo) => todo.id !== todoId);
    this.render(this.todos);
  }

  toggleAll(completed) {
    currentTodos.forEach((todo) => {
      todo.completed = completed;
    });

    this.render(this.todos);
  }

  toggleTodo(todoId, completed) {
    const selectedTodo = currentTodos.find((todo) => todo.id === todoId);

    selectedTodo.completed = completed;
    this.render(this.todos);
  }

  editTodo(todoId) {
    const editInput = this.root.querySelector(`.edit${todoId}`);
    const todoItem = this.root.querySelector(`.view${todoId}`);

    editInput.className = `edit-field edit${todoId}`;
    todoItem.classList.add('invisible');
    editInput.focus();
    editInput.selectionStart = editInput.value.length;
  }

  setTitle(todoId, title) {
    const selectedTodo = currentTodos.find((todo) => todo.id === id);

    selectedTodo.title = title;
    this.render(this.todos);
  }

  setTitleOnKeydown(event, todoId, title) {
    if (event.key !== 'Enter' || !event.target.value.trim()) {
      return;
    }

    this.setTitle(todoId, title);
  }

  setTitleOnBlur(event, todoId, title) {
    if (!event.target.value.trim()) {
      return;
    }

    this.setTitle(todoId, title);
  }

  clearCompleted() {
    currentTodos = currentTodos.filter((todo) => !todo.completed);
    this.render(this.todos);
  }

  openModalWindow(todoId) {
    const modal = this.root.querySelector('.modal');

    modal.classList.add('modal--active', `modal${todoId}`);
    id = todoId;
  }

  deleteTodoAndCloseModalWindow() {
    const modal = this.root.querySelector(`.modal${id}`);

    modal.classList.remove('modal--active', `modal${id}`);
    this.removeTodo(id);
  }

  closeModalWindow() {
    const modal = this.root.querySelector(`.modal${id}`);

    modal.classList.remove('modal--active', `modal${id}`);
  }
}
const todoList = new TodoList();
