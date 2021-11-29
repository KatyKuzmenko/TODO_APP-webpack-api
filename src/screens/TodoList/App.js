import NewTodoInput from '../../components/NewTodoInput'
import TodoList from '../../components/TodoList'
import TodoListFooter from '../../components/TodoListFooter'
import eventEmitter from '../../utils/EventEmitter'
import '../../style.css'
import Modal from '../../components/Modal'

class App {
  constructor() {
    this.todoInput = new NewTodoInput()
    this.todoList = new TodoList()
    this.todoFilter = new TodoListFooter()
    this.modal = new Modal()
    eventEmitter.subscribe('renderTodoInput', this.todoInput.update)
    eventEmitter.subscribe('renderTodoList', this.todoList.update)
    eventEmitter.subscribe('renderTodoFilter', this.todoFilter.update)
    eventEmitter.subscribe('renderModalWindow', this.modal.render())
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
