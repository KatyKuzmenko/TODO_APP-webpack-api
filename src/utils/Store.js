import {
  createTodo,
  deleteTodo,
  getTodos,
  updateStatus,
  updateTodo,
  toggleAll,
  deleteCompletedTodos,
} from './api'
import eventEmitter from './EventEmitter'

const uploadData = () => {
  getTodos()
    .then((todos) => {
      Store.state.todos = todos
      eventEmitter.emit('renderTodoList')
      eventEmitter.emit('renderTodoFilter')
      eventEmitter.emit('updateCounter')
    })
    .catch((err) => {
      console.warn(err)
    })
}

export default class Store {
  static state = {
    todos: [],
    filterType: 'all',
  }

  constructor() {
    uploadData()
  }

  static updateData(action) {
    switch (action.type) {
      case 'addTodo':
        createTodo(action.title)
          .then((todos) => {
            console.log('Success:', todos)
            uploadData()
          })
          .catch((error) => {
            console.warn(error)
          })
        break

      case 'deleteTodo':
        deleteTodo(action.id)
          .then((todos) => {
            console.log('Success:', todos)
            uploadData()
          })
          .catch((error) => {
            console.warn(error)
          })
        break

      case 'deleteCompletedTodos':
        deleteCompletedTodos()
          .then((todos) => {
            console.log('Success:', todos)
            uploadData()
          })
          .catch((error) => {
            console.warn(error)
          })
        break

      case 'updateTitle':
        updateTodo(action.id, action.title)
          .then((todos) => {
            console.log('Success:', todos)
            uploadData()
          })
          .catch((error) => {
            console.warn(error)
          })
        break

      case 'updateStatus':
        updateStatus(action.id, action.status)
          .then((todos) => {
            console.log('Success:', todos)
            uploadData()
          })
          .catch((error) => {
            console.warn(error)
          })
        break

      case 'toggleAll':
        toggleAll(action.iscompleted)
          .then((todos) => {
            console.log('Success:', todos)
            uploadData()
          })
          .catch((error) => {
            console.warn(error)
          })
        break
    }
  }
}
