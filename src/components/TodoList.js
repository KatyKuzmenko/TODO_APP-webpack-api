import Component from '../utils/Component'
import eventEmitter from '../utils/EventEmitter'
import Store from '../utils/Store'

export default class TodoList extends Component {
  render() {
    const main = document.createElement('section')
    main.classList.add('main', 'invisible')
    const list = document.createElement('ul')
    list.className = 'todo-list'
    const toggleAllContainer = document.createElement('span')
    toggleAllContainer.className = 'toggle-all-container'

    const toggleAllCheckbox = document.createElement('input')
    toggleAllCheckbox.id = 'toggle-all'
    toggleAllCheckbox.className = 'toggle-all'
    toggleAllCheckbox.type = 'checkbox'
    toggleAllCheckbox.checked = false

    const toggleAllLabel = document.createElement('label')
    toggleAllLabel.htmlFor = 'toggle-all'

    if (toggleAllCheckbox) {
      toggleAllCheckbox.addEventListener('change', (event) => this.toggleAll(event))
    }

    main.appendChild(toggleAllContainer)
    toggleAllContainer.appendChild(toggleAllCheckbox)
    toggleAllContainer.appendChild(toggleAllLabel)
    main.appendChild(list)

    return main
  }

  update() {
    const main = document.querySelector('.main')
    const todos = document.querySelectorAll('.todo-list__item')
    main.classList.toggle('invisible', todos.length === 0)
  }

  toggleAll(event) {
    Store.state.todos.forEach((todo) => {
      todo.completed = event.target.checked
    })
    const togglers = document.querySelectorAll('.toggle')
    for (const toggler of togglers) {
      toggler.checked = event.target.checked
      toggler.closest('.todo-list__item').classList.toggle('completed', event.target.checked)
    }
    eventEmitter.emit('renderTodoList', [])
    eventEmitter.emit('updateCounter', [])
  }

  updateAllToggler() {
    const notCompletedTogglers = document.querySelectorAll('.toggle:not(:checked)')
    const allToggler = document.querySelector('.toggle-all')
    allToggler.checked = notCompletedTogglers.length === 0
  }
} 

const todoList = new TodoList()
