import * as actions from './actionTypes'

export default function reducer(state = [], action) {
  switch(action.type) {
    case actions.ADD_TODO:
      return [...state, {
        title: action.payload.title,
        iscompleted: false,
      }]

    case actions.TOGGLE_TODO:
      return state.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, iscompleted: !todo.iscompleted}
        }

        return todo
      })

    case actions.DELETE_TODO:
      return state.filter(todo => action.payload.id !== todo.id)

    case actions.EDIT_TITLE:
      return state.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, title: action.payload.title}
        }
      })

    case actions.TOGGLE_ALL:
      return state.map(todo => {
        return { ...todo, iscompleted: action.payload.iscompleted}
      })

    case actions.CLEAR_COMPLETED:
      return state.filter(todo => todo.iscompleted === false)
  }
}