import {
  INIT_TODOS,
  ADD_TODO,
  TOGGLE_TODO,
  TOGGLE_ALL,
  DELETE_TODO,
  EDIT_TITLE,
  CLEAR_COMPLETED
} from './actionTypes'

export const initState = (todos) => ({
  type: INIT_TODOS,
  options: todos
})

export const addTodo = (id, title) => ({
  type: ADD_TODO,
  options: { id, title }
})

export const toggleTodo = (id, iscompleted) => ({
  type: TOGGLE_TODO,
  options: { id, iscompleted }
})

export const removeTodo = id => ({
  type: DELETE_TODO,
  options: { id }
})

export const toggleAll = iscompleted => ({
  type: TOGGLE_ALL,
  options: { iscompleted }
})

export const editTitle = (id, title) => ({
  type: EDIT_TITLE,
  options: { id, title }
})

export const clearTodos = () => ({
  type: CLEAR_COMPLETED
})