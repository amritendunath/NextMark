const PORT = process.env.PORT ?? 8000
const express = require('express')
const app = express()
const fetchItems = require('./dynamoDB')
const dotenv = require('dotenv')

dotenv.config()

// get all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await fetchItems();
    res.json(todos)
  } catch (err) {
    console.error(err)
  }
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, ( )=> console.log(`Server running on PORT ${PORT}`))