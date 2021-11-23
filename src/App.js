export default class App {
  render() {
    const activeTodos = this.todos.filter((todo) => !todo.completed);
    const completedTodos = this.todos.filter((todo) => todo.completed);
    const filteredTodos = {
      all: this.todos,
      active: activeTodos,
      completed: completedTodos,
    };

    const visibleTodos = filteredTodos[this.filterType];
    const header = `
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          placeholder="What needs to be done?"
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
        ${header}
        ${this.todos.length > 0 ? `
          ${main}
          ${footer}
        ` : ''}
        ${modal}
    `;

    const input = this.root.querySelector('.new-todo');
    input.focus();
  }
}
