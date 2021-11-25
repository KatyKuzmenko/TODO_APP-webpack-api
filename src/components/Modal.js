import Component from '../utils/Component';
import Store from '../utils/Store';
import Todo from './Todo';

export default class Modal extends Component {
  constructor() {
    super();
    this.root = document.querySelector('.modal-window');
    this.id = Todo.id;
  }

  render() {
    super.render();
    const modal = document.createElement('div');
    modal.className = 'modal';

    const modalContentDiv = document.createElement('div');
    modalContentDiv.className = 'modal__content';

    const modalCloseButton = document.createElement('button');
    modalCloseButton.className = 'modal__close-button';

    const modalTitle = document.createElement('p');
    modalTitle.className = 'modal__title';
    modalTitle.innerText = 'Are you sure You want to delete this task?';

    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'button-container';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'modal__button--delete';
    deleteButton.innerText = 'Delete';

    const cancelButton = document.createElement('button');
    cancelButton.className = 'modal__button--delete';
    cancelButton.innerText = 'Cancel';

    modal.appendChild(modalContentDiv);
    modalContentDiv.appendChild(modalCloseButton);
    modalContentDiv.appendChild(modalTitle);
    modalContentDiv.appendChild(buttonsContainer);
    buttonsContainer.appendChild(deleteButton);
    buttonsContainer.appendChild(cancelButton);

    const closeModalButton = document.querySelector('.modal__close-button');
    const deleteModalButton = document.querySelector('.modal__button--delete');
    const cancelModalButton = document.querySelector('.modal__button--cancel');

    closeModalButton.addEventListener('click', this.closeModalWindow());

    deleteModalButton.addEventListener('click', this.deleteTodoAndCloseModalWindow);

    cancelModalButton.addEventListener('click', this.closeModalWindow());
  }

  closeModalWindow() {
    const modalWindow = document.querySelector(`.modal${this.id}`);
    modalWindow.classList.remove('modal--active', `modal${this.id}`);
  }

  deleteTodoAndCloseModalWindow() {
    const modalWindow = document.querySelector(`.modal${this.id}`);
    modalWindow.classList.remove('modal--active', `modal${this.id}`);
    Store.state.todos = Store.state.todos.filter((todo) => todo.id !== this.id);
  }
}

const modalWindow = new Modal();
