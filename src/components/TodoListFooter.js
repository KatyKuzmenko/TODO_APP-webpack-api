import Component from '../utils/Component'
import eventEmitter from '../utils/EventEmitter'
import Store from '../utils/Store'

export default class TodoListFooter extends Component {
  static completedTodos = Store.state.todos.filter((todo) => todo.completed)

  constructor() {
    super()
  }

  setFilter(event) {
    Store.state.filterType = event.target.dataset.filter
    event.target.className = 'selected'
  }

  clearCompleted() {
    Store.state.todos = Store.state.todos.filter((todo) => todo.completed)
  }

  render() {
    const infoBlock = document.createElement('footer')
    infoBlock.classList.add('footer', 'invisible')

    const todoCount = document.createElement('span')
    todoCount.className = 'todo-count'
    const filtersList = document.createElement('ul')
    filtersList.className = 'filters'

    const filterItem1 = document.createElement('li')
    const filterItem2 = document.createElement('li')
    const filterItem3 = document.createElement('li')

    const filterLinkAll = document.createElement('a')
    filterLinkAll.dataset.type = 'filter'
    filterLinkAll.dataset.filter = 'all'
    filterLinkAll.href = '#/'
    filterLinkAll.className = 'selected'
    filterLinkAll.innerText = 'All'

    const filterLinkActive = document.createElement('a')
    filterLinkActive.dataset.type = 'filter'
    filterLinkActive.dataset.filter = 'active'
    filterLinkActive.href = '#/active'
    filterLinkActive.innerText = 'Active'

    const filterLinkCompleted = document.createElement('a')
    filterLinkCompleted.dataset.type = 'filter'
    filterLinkCompleted.dataset.filter = 'completed'
    filterLinkCompleted.href = '#/completed'
    filterLinkCompleted.innerText = 'Completed'

    const clearCompletedButton = document.createElement('button')
    clearCompletedButton.className = 'clear-completed'
    clearCompletedButton.classList.add('invisible');
    clearCompletedButton.innerText = 'Clear completed'

    infoBlock.appendChild(todoCount)
    infoBlock.appendChild(filtersList)
    filtersList.appendChild(filterItem1)
    filterItem1.appendChild(filterLinkAll)
    filtersList.appendChild(filterItem2)
    filterItem2.appendChild(filterLinkActive)
    filtersList.appendChild(filterItem3)
    filterItem3.appendChild(filterLinkCompleted)

    infoBlock.appendChild(clearCompletedButton)

    const filterLinks = document.querySelectorAll('[data-type="filter"]')

    filterLinks.forEach((filter) => {
      filter.addEventListener('click', (event) => this.setFilter(event))

      if (clearCompletedButton) {
        clearCompletedButton.addEventListener('click', () => this.clearCompleted())
      }
    })

    return infoBlock
  }

  update() {
    const footer = document.querySelector('.footer')
    const clearCompletedButton = document.querySelector('.clear-completed')
    if (Store.state.todos.length > 0) {
      footer.classList.remove('invisible')
    } else {
      footer.className = 'footer invisible'
    }

    if(Store.state.todos.find((todo) => todo.completed)) {
      clearCompletedButton.classList.remove('invisible')
    } else {
      clearCompletedButton.className = 'clear-completed invisible'
    }
  }
}

const footer = new TodoListFooter()
