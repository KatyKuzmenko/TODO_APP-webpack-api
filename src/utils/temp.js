import Store from './Store';

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
