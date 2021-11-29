import Component from '../utils/Component'
import Store from '../utils/Store'
import '../style.css'
import eventEmitter from '../utils/EventEmitter'

export default class Todo extends Component {
  constructor(title) {
    super()
    this.id = +new Date()
    this.title = title
    this.completed = false
    this.render()
  }

  render() {
    super.render()
    const listItem = document.createElement('li')
    listItem.className = 'todo-list__item'
    listItem.dataset.todoId = `${this.id}`

    const viewDiv = document.createElement('div')
    viewDiv.className = `view${this.id}`

    const todoCheckbox = document.createElement('input')
    todoCheckbox.id = `todo-${this.id}`
    todoCheckbox.dataset.inputId = `${this.id}`
    todoCheckbox.className = 'toggle'
    todoCheckbox.type = 'checkbox'
    todoCheckbox.checked = this.completed

    const todoLabel = document.createElement('label')
    todoLabel.className = 'todo-title'
    todoLabel.innerText = this.title
    todoLabel.dataset.labelId = `${this.id}`

    const deleteTodoButton = document.createElement('button')
    deleteTodoButton.className = 'destroy'
    deleteTodoButton.dataset.destroyId = `${this.id}`

    const editInput = document.createElement('input')
    editInput.type = 'text'
    editInput.className = `edit-field edit${this.id} invisible`
    editInput.id = `${this.id}`
    editInput.value = `${this.title}`
    const list = document.querySelector('.todo-list')

    list.appendChild(listItem)
    listItem.appendChild(viewDiv)
    viewDiv.appendChild(todoCheckbox)
    viewDiv.appendChild(todoLabel)
    viewDiv.appendChild(deleteTodoButton)
    listItem.appendChild(editInput)

    const todoTogglers = document.querySelectorAll('.toggle')
    const todoTitle = document.querySelectorAll('.todo-title')
    const destroyButton = document.querySelectorAll('.destroy')
    const editInputs = document.querySelectorAll('.edit-field')

    todoTogglers.forEach((toggler) => {
      toggler.addEventListener('change', (event) => this.toggleTodo(event))
    })

    todoTitle.forEach((title) => {
      title.addEventListener('dblclick', (event) => this.editTitle(event))
    })

    destroyButton.forEach((button) => {
      button.addEventListener('click', (event) => this.openModalWindow(event))
    })

    editInputs.forEach((edit) => {
      edit.addEventListener('keydown', (event) => this.setNewTitleOnEnter(event))

      edit.addEventListener('blur', (event) => this.setNewTitleOnBlur(event))
    })
  }

  toggleTodo(event) {
    const selectedTodo = Store.state.todos.find((todo) => todo.id === +event.target.dataset.inputId)
    this.completed = event.target.checked
    const item = document.querySelector(`[data-todo-id="${event.target.dataset.inputId}"]`)

    if (event.target.checked) {
      item.classList.add('completed')
    } else {
      item.classList.remove('completed')
    }
  }

  editTitle(event) {
    const todoId = +event.target.dataset.labelId
    const editTodo = document.querySelector(`.edit${todoId}`)
    const todoItem = document.querySelector(`.view${todoId}`)
    todoItem.classList.add('invisible')
    editTodo.classList.remove('invisible')
    editTodo.focus()
    editTodo.selectionStart = editTodo.value.length
  }

  setNewTitleOnEnter(event) {
    if (!event.target.value.trim() || event.key !== 'Enter') {
      return
    }

    const selectedTodo = Store.state.todos.find((todo) => todo.id === +event.target.id)
    selectedTodo.title = event.target.value
    const todoItem = document.querySelector(`.view${event.target.id}`)
    const todoTitle = document.querySelector(`[data-label-id="${event.target.id}"]`)
    todoTitle.innerText = event.target.value
    todoItem.classList.remove('invisible')
    event.target.classList.add('invisible')
  }

  setNewTitleOnBlur(event) {
    if (!event.target.value.trim()) {
      return
    }

    const selectedTodo = Store.state.todos.find((todo) => todo.id === +event.target.id)
    selectedTodo.title = event.target.value
    const todoItem = document.querySelector(`.view${event.target.id}`)
    const todoTitle = document.querySelector(`[data-label-id="${event.target.id}"]`)
    todoTitle.innerText = event.target.value
    todoItem.classList.remove('invisible')
    event.target.classList.add('invisible')
  }

  openModalWindow(event) {
    eventEmitter.emit('deleteTodo', [+event.target.dataset.destroyId])
    const modalWindow = document.querySelector('.modal')

    modalWindow.classList.add('modal--active', `modal${+event.target.dataset.destroyId}`)
  }
}
