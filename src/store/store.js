import reducer from './reducer'
import eventEmitter from '../utils/EventEmitter'
import { addTodo } from './actions'
import { getTodos } from '../API/api'

export const createStore = (reduce, initialState) => {
  let state = initialState

  return {
    getState() {
      return state
    },
    dispatch(action) {
      state = reduce(state, action)
    }
  }
}



export const store = createStore(reducer, [])
eventEmitter.subscribe('dispatch', () => console.log(store.getState()))
console.log(store.getState())