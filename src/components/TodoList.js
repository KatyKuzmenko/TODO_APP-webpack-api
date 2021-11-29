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
      toggleAllCheckbox.addEventListener('change', (event) => this.toggleAll(event.target.checked))
    }

    main.appendChild(toggleAllContainer)
    toggleAllContainer.appendChild(toggleAllCheckbox)
    toggleAllContainer.appendChild(toggleAllLabel)
    main.appendChild(list)

    return main
  }

  update() {
    const main = document.querySelector('.main')
    if (Store.state.todos.length > 0) {
      main.classList.remove('invisible')
    } else {
      main.className = 'main invisible'
    }
  }

  toggleAll(completed) {
    Store.state.todos.forEach((todo) => {
      todo.completed = completed
    })
  }
}

const todoList = new TodoList()
