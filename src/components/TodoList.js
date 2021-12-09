import { store } from '../store/store'
import Component from '../utils/Component'
import eventEmitter from '../utils/EventEmitter'
import Store from '../utils/Store'
import Todo from './Todo'
import { toggleAll } from '../store/actions'
import { toggleAllTodos } from '../API/api'

export default class TodoList extends Component {
  render() {
    const main = document.createElement('section')
    main.classList.add('main')

    const list = document.createElement('ul')
    list.className = 'todo-list'

    const toggleAllContainer = document.createElement('span')
    toggleAllContainer.className = 'toggle-all-container'

    const toggleAllCheckbox = document.createElement('input')
    toggleAllCheckbox.id = 'toggle-all'
    toggleAllCheckbox.className = 'toggle-all'
    toggleAllCheckbox.type = 'checkbox'
    toggleAllCheckbox.checked = false

    if (toggleAllCheckbox) {
      toggleAllCheckbox.addEventListener('change', (event) => this.toggleAll(event))
    }

    const toggleAllLabel = document.createElement('label')
    toggleAllLabel.htmlFor = 'toggle-all'

    main.appendChild(toggleAllContainer)
    toggleAllContainer.appendChild(toggleAllCheckbox)
    toggleAllContainer.appendChild(toggleAllLabel)
    main.appendChild(list)

    return main
  }

  update() {
    const list = document.querySelector('.todo-list')
    list.innerHTML = ''
    eventEmitter.emit('initTodos', [Store.state.todos])
    const main = document.querySelector('.main')
    const todos = document.querySelectorAll('.todo-list__item')
    main.classList.toggle('invisible', todos.length === 0)
  }

  toggleAll(event) {
    store.dispatch(toggleAll(event.target.checked))
    eventEmitter.emit('dispatch')
    toggleAllTodos(event.target.checked)
      .then(todos => todos)
      .catch(err => console.warn(err))
  }

  updateAllToggler() {
    const notCompletedTogglers = document.querySelectorAll('.toggle:not(:checked)')
    const allToggler = document.querySelector('.toggle-all')
    allToggler.checked = notCompletedTogglers.length === 0
  }

  updateTodos() {
    Store.state.todos.forEach((todo) => new Todo(todo))
  }
}

const todoList = new TodoList()
