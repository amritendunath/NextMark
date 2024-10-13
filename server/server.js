const PORT = process.env.PORT ?? 8000
const express = require('express')
const app = express()
const {fetchItems, queryItems} = require('./dynamoDB')
const dotenv = require('dotenv')

dotenv.config()

// get all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await fetchItems();
    console.log(todos)
    res.json(todos)
  } catch (err) {
    console.error(err)
  }
})

//get queryTodos
app.get('/qTodos', async (req, res) => {
  try {
    const todos = await queryItems();
    console.log(todos)
    res.json(todos)
  } catch (err) {
    console.error(err)
  }
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))