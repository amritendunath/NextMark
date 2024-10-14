const PORT = process.env.PORT ?? 8000
const express = require('express')
const app = express()
const {fetchItems, queryItems} = require('./dynamoDB')
const dotenv = require('dotenv')
const cors = require('cors')

app.use(cors())

dotenv.config()

// get all todos
app.get('/todos', async (req, res) => {
  // console.log(req)
  try {
    const todos = await fetchItems();
    console.log(todos)
    res.json(todos)
  } catch (err) {
    console.error(err)
  }
})

// get queryTodos
app.get('/qTodos/:userEmail', async (req, res) => {
  const userEmail = req.params.userEmail;
  try {
    const todos = await queryItems([userEmail]);
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