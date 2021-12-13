import storeReducer from './reducer'

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
