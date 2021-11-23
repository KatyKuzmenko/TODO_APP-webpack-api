import App from './App';
import './style.css';
import Todo from './Todo';

export default class TodoList extends App {
  constructor() {
    super();
    this.root = document.querySelector('.todoapp');
    this.todos = [];
    this.id = 0;
    this.filterType = 'all';
    this.render(this.todos);
  }

  render() {
    super.render();
    const newTodoInput = document.querySelector('.new-todo');
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

    if (newTodoInput) {
      newTodoInput.addEventListener('keydown', (event) => {
        if (!event.target.value || event.key !== 'Enter') {
          return;
        }

        this.todos.push(new Todo(event.target.value));
        this.render(this.todos);
      });
    }

    if (toggleAll) {
      toggleAll.addEventListener('change', (event) => {
        this.todos.forEach((todo) => {
          todo.completed = event.target.checked;
        });

        this.render(this.todos);
      });
    }

    todoTogglers.forEach((toggler) => {
      toggler.addEventListener('change', (event) => {
        const selectedTodo = this.todos.find((todo) => todo.id === +event.target.dataset.inputId);
        selectedTodo.completed = event.target.checked;
        this.render(this.todos);
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
        const modalWindow = this.root.querySelector('.modal');

        modalWindow.classList.add('modal--active', `modal${+event.target.dataset.destroyId}`);
        this.id = +event.target.dataset.destroyId;
      });
    });

    editInput.forEach((edit) => {
      edit.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' || !event.target.value.trim()) {
          return;
        }

        const selectedTodo = this.todos.find((todo) => todo.id === +event.target.id);

        selectedTodo.title = event.target.value;
        this.render(this.todos);
      });

      edit.addEventListener('blur', (event) => {
        if (!event.target.value.trim()) {
          return;
        }

        const selectedTodo = this.todos.find((todo) => todo.id === +event.target.id);

        selectedTodo.title = event.target.value;
        this.render(this.todos);
      });
    });

    filterLinks.forEach((filter) => {
      filter.addEventListener('click', (event) => {
        this.filterType = event.target.dataset.filter;
        this.render(this.todos);
      });
    });

    if (clearCompletedButton) {
      clearCompletedButton.addEventListener('click', () => {
        this.todos = this.todos.filter((todo) => !todo.completed);
        this.render(this.todos);
      });
    }

    closeModalButton.addEventListener('click', () => {
      const modalWindow = this.root.querySelector(`.modal${this.id}`);

      modalWindow.classList.remove('modal--active', `modal${this.id}`);
    });

    deleteModalButton.addEventListener('click', () => {
      const modalWindow = this.root.querySelector(`.modal${this.id}`);
      modalWindow.classList.remove('modal--active', `modal${this.id}`);
      this.todos = this.todos.filter((todo) => todo.id !== this.id);
      this.render(this.todos);
    });

    cancelModalButton.addEventListener('click', () => {
      const modalWindow = this.root.querySelector(`.modal${this.id}`);

      modalWindow.classList.remove('modal--active', `modal${this.id}`);
    });
  }
}
// addTodo(event) {
//   if (!event.target.value || event.key !== 'Enter') {
//     return;
//   }

//   this.todos.push(new Todo(event.target.value));
//   this.render(this.todos);
// }

// setFilterType(type) {
//   this.filterType = type;
//   this.render(this.todos);
// }

// removeTodo(id) {
//   this.todos = this.todos.filter((todo) => todo.id !== id);
//   this.render(this.todos);
// }

// toggleAll(completed) {
//   this.todos.forEach((todo) => {
//     todo.completed = completed;
//   });

//   this.render(this.todos);
// }

// toggleTodo(id, completed) {
//   const selectedTodo = this.todos.find((todo) => todo.id === id);

//   selectedTodo.completed = completed;
//   this.render(this.todos);
// }

// editTodo(id) {
//   const editInput = this.root.querySelector(`.edit${id}`);
//   const todoItem = this.root.querySelector(`.view${id}`);

//   editInput.className = `edit-field edit${id}`;
//   todoItem.classList.add('invisible');
//   editInput.focus();
//   editInput.selectionStart = editInput.value.length;
// }

// setTitle(id, title) {
//   const selectedTodo = this.todos.find((todo) => todo.id === id);

//   selectedTodo.title = title;
//   this.render(this.todos);
// }

// setTitleOnKeydown(event, id, title) {
//   if (event.key !== 'Enter' || !event.target.value.trim()) {
//     return;
//   }

//   this.setTitle(id, title);
// }

// setTitleOnBlur(event, id, title) {
//   if (!event.target.value.trim()) {
//     return;
//   }

//   this.setTitle(id, title);
// }

// clearCompleted() {
//   this.todos = this.todos.filter((todo) => !todo.completed);
//   this.render(this.todos);
// }

// openModalWindow(todoId) {
//   const modal = this.root.querySelector('.modal');

//   modal.classList.add('modal--active', `modal${todoId}`);
//   this.id = todoId;
// }

// deleteTodoAndCloseModalWindow() {
//   const modal = this.root.querySelector(`.modal${this.id}`);

//   modal.classList.remove('modal--active', `modal${this.id}`);
//   this.removeTodo(this.id);
// }

// closeModalWindow() {
//   const modal = this.root.querySelector(`.modal${this.id}`);

//   modal.classList.remove('modal--active', `modal${this.id}`);
// }

const todoList = new TodoList();
