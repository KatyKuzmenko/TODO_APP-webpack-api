import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateStatus,
  updateTodo,
  toggleAll
} from "../API/api";

export default class Store {
  static state = {
    todos: [],
    filterType: 'all',
  };

  static dispatch(action) {
    switch(action.type) {
      case 'addTodo': 
        createTodo(action.title)
          .then(todos => {
            console.log('Success:', todos)
          })
          .catch(error => {
            console.warn(error)
          })
        break
        
      case 'deleteTodo':
        deleteTodo(action.id)
          .then(todos => {
            console.log('Success:', todos)
          })
          .catch(error => {
            console.warn(error)
          })
        break
      case 'updateTitle':
        updateTodo(action.id, action.title)
          .then(todos => {
            console.log('Success:', todos)
          })
          .catch(error => {
            console.warn(error)
          })
        break
      case 'updateStatus':
        updateStatus(action.id, action.status)
          .then(todos => {
            console.log('Success:', todos)
          })
          .catch(error => {
            console.warn(error)
          })
        break
      case 'findTodo':
        getTodo(action.id)
          .then(todos => {
            console.log('Success:', todos)
          })
          .catch(error => {
            console.warn(error)
          })
        break
      case 'toggleAll':
        toggleAll(action.iscompleted)
          .then(todos => {
            console.log('Success:', todos)
          })
          .catch(error => {
            console.warn(error)
          })
        break
    }
  }
}
