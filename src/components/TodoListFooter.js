import Component from '../utils/Component'
import eventEmitter from '../utils/EventEmitter'
import Store from '../utils/Store'
import { store } from '../store/store'
import { clearTodos } from '../store/actions'

export default class TodoListFooter extends Component {
  static completedTodos = store.getState().filter((todo) => todo.iscompleted)

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

    filterLinkAll.addEventListener('click', (event) => this.setFilter(event.target.dataset.filter))
    filterLinkActive.addEventListener('click', (event) =>
      this.setFilter(event.target.dataset.filter)
    )
    filterLinkCompleted.addEventListener('click', (event) =>
      this.setFilter(event.target.dataset.filter)
    )

    clearCompletedButton.addEventListener('click', (event) => this.clearCompleted(event))

    return infoBlock
  }

  setFilter(type) {
    Store.state.filterType = type
    const filters = document.querySelectorAll('[data-filter]')
    filters.forEach((filter) => {
      filter.classList.remove('selected')
    })
    const activeFilter = document.querySelector(`[data-filter="${type}"]`)
    activeFilter.classList.add('selected')
    const togglers = document.querySelectorAll('.toggle')
    togglers.forEach((toggler) => {
      const item = toggler.closest('.todo-list__item')

      switch (type) {
        case 'all':
          item.hidden = false
          break

        case 'active':
          item.hidden = toggler.checked
          break

        case 'completed':
          item.hidden = !toggler.checked
          break
      }
    })
  }

  updateFooterVisibility() {
    const footer = document.querySelector('.footer')
    const todos = document.querySelectorAll('.todo-list__item')
    footer.classList.toggle('invisible', todos.length === 0)
  }

  updateClearButton() {
    const clearCompletedButton = document.querySelector('.clear-completed')
    const completedTogglers = document.querySelectorAll('.toggle:checked')
    clearCompletedButton.hidden = completedTogglers.length === 0
  }

  updateCounter() {
    const counter = document.querySelector('.todo-count')
    const notCompletedTogglers = document.querySelectorAll('.toggle:not(:checked)')
    counter.innerText = `${notCompletedTogglers.length} items left`
    eventEmitter.emit('updateClearButton')
    eventEmitter.emit('updateAllToggler')
    eventEmitter.emit('setFilter', [Store.state.filterType])
  }

  clearCompleted() {
    store.dispatch(clearTodos())
  }
}

const footer = new TodoListFooter()
