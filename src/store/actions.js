import * as actions from './actionTypes'

export const addTodo = title => ({
  type: actions.ADD_TODO,
  payload: { title }
})

export const toggleTodo = id => ({
  type: actions.TOGGLE_TODO,
  payload: { id }
})

export const removeTodo = id => ({
  type: actions.DELETE_TODO,
  payload: { id }
})

export const toggleAll = iscompleted => ({
  type: actions.TOGGLE_ALL,
  payload: { iscompleted }
})

export const editTitle = (id, title) => ({
  type: actions.EDIT_TITLE,
  payload: { id, title }
})

export const clearTodos = () => ({
  type: actions.CLEAR_COMPLETED
})