import NewTodoInput from '../../components/NewTodoInput'
import TodoList from '../../components/TodoList'
import TodoListFooter from '../../components/TodoListFooter'
import eventEmitter from '../../utils/EventEmitter'
import '../../style.css'
import Modal from '../../components/Modal'
import { getTodos } from '../../API/api'
import { store } from '../../store/store'
import { initState } from '../../store/actions'

class App {
  constructor() {
    this.todosFromServer = []
    getTodos().then((todos) => {
      this.todosFromServer = todos
      store.dispatch(initState(this.todosFromServer))
      eventEmitter.emit('updateTodos')
      eventEmitter.emit('updateTodoFilter')
    })
    this.todoInput = new NewTodoInput()
    this.todoList = new TodoList()
    this.todoFilter = new TodoListFooter()
    this.modal = new Modal()
    eventEmitter.subscribe('updateTodoInput', this.todoInput.update)
    eventEmitter.subscribe('updateTodos', this.todoList.update)
    eventEmitter.subscribe('updateTodoFilter', this.todoFilter.updateFooterVisibility)
    eventEmitter.subscribe('renderModalWindow', this.modal.render())
    eventEmitter.subscribe('updateCounter', this.todoFilter.updateCounter)
    eventEmitter.subscribe('updateClearButton', this.todoFilter.updateClearButton)
    eventEmitter.subscribe('updateAllToggler', this.todoList.updateAllToggler)
    eventEmitter.subscribe('setFilter', this.todoFilter.setFilter)
    eventEmitter.subscribe('initTodos', this.todoList.updateTodos)
  }

  render() {
    const div = document.createElement('div')
    div.append(this.todoInput.render())
    div.append(this.todoList.render())
    div.append(this.todoFilter.render())
    div.append(this.modal.render())
    return div
  }
}

export default new App()
