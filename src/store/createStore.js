import reducer from './reducer'
import eventEmitter from '../utils/EventEmitter'
import { addTodo } from './actions'

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



export const store1 = createStore(reducer, [])
eventEmitter.subscribe('dispatch', () => console.log(store1.getState()))
console.log(store1.getState())