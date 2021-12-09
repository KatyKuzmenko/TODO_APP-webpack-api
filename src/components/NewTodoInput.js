import Component from '../utils/Component'
import Store from '../utils/Store'

export default class NewTodoInput extends Component {
  constructor() {
    super()
  }

  render() {
    const header = document.createElement('header')
    header.className = 'header'

    const appTitle = document.createElement('h1')
    appTitle.innerText = 'todos'

    const todoInput = document.createElement('input')
    todoInput.className = 'new-todo'
    todoInput.placeholder = 'What needs to be done?'

    header.appendChild(appTitle)
    header.appendChild(todoInput)
    todoInput.focus()
    todoInput.addEventListener('keydown', (event) => this.addTodo(event))

    return header
  }

  update() {
    const input = document.querySelector('.new-todo')
    input.value = ''
    input.focus()
  }

  addTodo(event) {
    if (!event.target.value || event.key !== 'Enter') {
      return
    }

    Store.updateData({ type: 'addTodo', title: event.target.value })
    this.update()
  }
}

const mainInput = new NewTodoInput()
