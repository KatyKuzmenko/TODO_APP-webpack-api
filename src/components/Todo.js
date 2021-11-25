import Component from '../utils/Component';

export default class Todo extends Component {
  constructor(title) {
    super();
    this.id = +new Date();
    this.title = title;
    this.completed = false;
  }

  render() {
    const listItem = document.createElement('li');
    listItem.className = 'todo-list__item';
    listItem.classList.add(`${this.completed ? 'completed' : ''}`);
    listItem.dataset.todoId = `${this.id}`;

    const viewDiv = document.createElement('div');
    viewDiv.className = `view${this.id}`;

    const todoCheckbox = document.createElement('input');
    todoCheckbox.id = `todo-${this.id}`;
    todoCheckbox.dataset.inputId = `${this.id}`;
    todoCheckbox.className = 'toggle';
    todoCheckbox.type = 'checkbox';
    todoCheckbox.checked = this.completed;

    const todoLabel = document.createElement('label');
    todoLabel.className = 'todo-title';
    todoLabel.innerText = this.title;
    todoLabel.dataset.labelId = `${this.id}`;

    const deleteTodoButton = document.createElement('button');
    deleteTodoButton.className = 'destroy';
    deleteTodoButton.dataset.destroyId = `${this.id}`;

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = `edit-field edit${this.id} invisible`;
    editInput.id = `${this.id}`;
    editInput.value = `${this.title}`;

    listItem.appendChild(viewDiv);
    viewDiv.appendChild(todoCheckbox);
    viewDiv.appendChild(todoLabel);
    viewDiv.appendChild(deleteTodoButton);
    viewDiv.appendChild(editInput);
  }
}

const todo = new Todo();
