import Component from '../utils/Component'
import Store from '../utils/Store'
import '../style.css'
import eventEmitter from '../utils/EventEmitter'
import { store } from '../store/store'
import { editTitle, toggleTodo } from '../store/actions'

export default class Todo extends Component {
  constructor(todo) {
    super()
    this.id = todo.id
    this.title = todo.title
    this.iscompleted = todo.iscompleted
    this.render()
  }

  render() {
    const listItem = document.createElement('li')
    listItem.className = 'todo-list__item'
    listItem.dataset.todoId = `${this.id}`
    if (this.iscompleted) {
      listItem.classList.add('completed')
    }

    const viewDiv = document.createElement('div')
    viewDiv.className = `view${this.id}`

    const todoCheckbox = document.createElement('input')
    todoCheckbox.id = `todo-${this.id}`
    todoCheckbox.dataset.inputId = `${this.id}`
    todoCheckbox.className = 'toggle'
    todoCheckbox.type = 'checkbox'
    todoCheckbox.checked = this.iscompleted

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
    store.dispatch(toggleTodo(+event.target.dataset.inputId))

    const selectedTodo = store.getState().find((todo) => todo.id === +event.target.dataset.inputId)
    this.iscompleted = event.target.checked
    const item = document.querySelector(`[data-todo-id="${event.target.dataset.inputId}"]`)

    event.target.closest('.todo-list__item').classList.toggle('completed', event.target.checked)
    eventEmitter.emit('updateCounter', [])
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

    store.dispatch(editTitle(+event.target.id, event.target.value))
    eventEmitter.emit('dispatch')
  }

  setNewTitleOnBlur(event) {
    if (!event.target.value.trim()) {
      return
    }

    store.dispatch(editTitle(+event.target.id, event.target.value))
    eventEmitter.emit('dispatch')
  }

  openModalWindow(event) {
    eventEmitter.emit('deleteTodo', [+event.target.dataset.destroyId])
    const modalWindow = document.querySelector('.modal')

    modalWindow.classList.add('modal--active', `modal${+event.target.dataset.destroyId}`)
  }
}
