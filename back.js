const express = require('express')
const app = express()
const path = require('path')

const todos = [
  {id: 1, title: 'first todo', completed: false}
]

app.use(express.static(path.resolve(__dirname, 'src')))

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, './dist/index.html'))
})
app.listen(3000, () => console.log('Server has been started on port 3000...'))