import {
  INIT_TODOS,
  ADD_TODO,
  TOGGLE_TODO,
  TOGGLE_ALL,
  DELETE_TODO,
  EDIT_TITLE,
  CLEAR_COMPLETED,
} from './actionTypes'

export default function storeReducer(state = [], action) {
  switch (action.type) {
    case INIT_TODOS:
      return [...action.options]

    case ADD_TODO:
      return [
        ...state,
        {
          id: action.options.id,
          title: action.options.title,
          iscompleted: false,
        },
      ]

    case TOGGLE_TODO:
      return state.map((todo) => {
        if (todo.id === action.options.id) {
          return { ...todo, iscompleted: action.options.iscompleted }
        }

        return todo
      })

    case DELETE_TODO:
      return state.filter((todo) => action.options.id !== todo.id)

    case EDIT_TITLE:
      return state.map((todo) => {
        if (todo.id === action.options.id) {
          return { ...todo, title: action.options.title }
        }

        return todo
      })

    case TOGGLE_ALL:
      return state.map((todo) => {
        return { ...todo, iscompleted: action.options.iscompleted }
      })

    case CLEAR_COMPLETED:
      return state.filter((todo) => todo.iscompleted === false)

    default:
      return state
  }
}
