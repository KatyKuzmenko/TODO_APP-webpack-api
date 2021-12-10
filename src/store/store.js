import storeReducer from './reducer'
import eventEmitter from '../utils/EventEmitter'
import { addTodo } from './actions'
import { getTodos } from '../API/api'
import app from '../screens/TodoList/App'

export const createStore = (reducer, initialState) => {
  let state = initialState

  return {
    getState() {
      return state
    },
    dispatch(action) {
      state = reducer(state, action)
    },
  }
}

export const store = createStore(storeReducer, [])
eventEmitter.subscribe('dispatch', () => console.log(store.getState()))
console.log(store.getState())
