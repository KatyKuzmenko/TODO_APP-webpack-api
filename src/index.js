import { getTodos } from './API/api'
import app from './screens/TodoList/App'
import './style.css'
import eventEmitter from './utils/EventEmitter'
import Store from './utils/Store'

const root = document.querySelector('.todoapp')

root.append(app.render())

