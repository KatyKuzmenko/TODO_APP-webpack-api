import reducer from '../store/reducer'
import { createStore } from '../store/createStore'
import {
  createTodo,
  deleteTodo,
  // getTodos,
  updateStatus,
  updateTodo,
  toggleAll,
  deleteCompletedTodos,
} from '../API/api'

export default class Store {
  constructor() {
    createStore(reducer, [])
  }
  static filterType = 'all'
  
  // static updateData(action) {
  //   switch (action.type) {
  //     case 'addTodo':
  //       createTodo(action.title)
  //         .then((todos) => {
  //           console.log('Success:', todos)
  //           uploadData()
  //         })
  //         .catch((error) => {
  //           console.warn(error)
  //         })
  //       break

  //     case 'deleteTodo':
  //       deleteTodo(action.id)
  //         .then((todos) => {
  //           console.log('Success:', todos)
  //           uploadData()
  //         })
  //         .catch((error) => {
  //           console.warn(error)
  //         })
  //       break

  //     case 'deleteCompletedTodos':
  //       deleteCompletedTodos()
  //         .then((todos) => {
  //           console.log('Success:', todos)
  //           uploadData()
  //         })
  //         .catch((error) => {
  //           console.warn(error)
  //         })
  //       break

  //     case 'updateTitle':
  //       updateTodo(action.id, action.title)
  //         .then((todos) => {
  //           console.log('Success:', todos)
  //           uploadData()
  //         })
  //         .catch((error) => {
  //           console.warn(error)
  //         })
  //       break

  //     case 'updateStatus':
  //       updateStatus(action.id, action.status)
  //         .then((todos) => {
  //           console.log('Success:', todos)
  //           uploadData()
  //         })
  //         .catch((error) => {
  //           console.warn(error)
  //         })
  //       break

  //     case 'toggleAll':
  //       toggleAll(action.iscompleted)
  //         .then((todos) => {
  //           console.log('Success:', todos)
  //           uploadData()
  //         })
  //         .catch((error) => {
  //           console.warn(error)
  //         })
  //       break
  //   }
  // }
}
