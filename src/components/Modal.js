import Component from '../utils/Component'
import Store from '../utils/Store'
import eventEmitter from '../utils/EventEmitter'
import { store } from '../store/store'
import { removeTodo } from '../store/actions'
import { deleteTodo } from '../API/api'

export default class Modal extends Component {
  constructor() {
    super()
    this.id = null
    eventEmitter.subscribe('deleteTodo', (id) => (this.id = id))
  }

  render() {
    const modal = document.createElement('div')
    modal.className = 'modal'

    const modalContentDiv = document.createElement('div')
    modalContentDiv.className = 'modal__content'

    const modalCloseButton = document.createElement('button')
    modalCloseButton.className = 'modal__close-button'

    const modalTitle = document.createElement('p')
    modalTitle.className = 'modal__title'
    modalTitle.innerText = 'Are you sure You want to delete this task?'

    const buttonsContainer = document.createElement('div')
    buttonsContainer.className = 'button-container'

    const deleteButton = document.createElement('button')
    deleteButton.className = 'modal__button--delete'
    deleteButton.innerText = 'Delete'

    const cancelButton = document.createElement('button')
    cancelButton.className = 'modal__button--delete'
    cancelButton.innerText = 'Cancel'

    modal.appendChild(modalContentDiv)
    modalContentDiv.appendChild(modalCloseButton)
    modalContentDiv.appendChild(modalTitle)
    modalContentDiv.appendChild(buttonsContainer)
    buttonsContainer.appendChild(deleteButton)
    buttonsContainer.appendChild(cancelButton)

    modalCloseButton.addEventListener('click', (event) => this.closeModalWindow(event))

    deleteButton.addEventListener('click', (event) => this.deleteTodoAndCloseModalWindow(event))

    cancelButton.addEventListener('click', (event) => this.closeModalWindow(event))

    return modal
  }

  closeModalWindow() {
    const modalWindow = document.querySelector(`.modal${this.id}`)
    modalWindow.classList.remove('modal--active', `modal${this.id}`)
  }

  deleteTodoAndCloseModalWindow() {
    store.dispatch(removeTodo(this.id))
    eventEmitter.emit('dispatch')
    deleteTodo(this.id)
      .then(todos => {
        console.log('Success:', todos)
        eventEmitter.emit('updateTodos')
        eventEmitter.emit('updateCounter')
        eventEmitter.emit('updateClearButton')
        eventEmitter.emit('renderTodoFilter')
      })
      .catch(error => {
        console.warn(error)
      })
    const modalWindow = document.querySelector(`.modal${this.id}`)
    modalWindow.classList.remove('modal--active', `modal${this.id}`)
  }
}

const modalWindow = new Modal()
