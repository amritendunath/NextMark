const PORT = process.env.PORT ?? 8000
const express = require('express')
const app = express()
const {v4: uuidv4} = require('uuid');
const {fetchItems, queryItems,createItem} = require('./dynamoDB')
const dotenv = require('dotenv')
const cors = require('cors')

app.use(cors())
app.use(express.json())
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
app.get('/todos/:userEmail', async (req, res) => {
  const {userEmail} = req.params;
  console.log(userEmail)
  console.log(req);
  try {
    const todos = await queryItems(userEmail);
    console.log(todos)
    res.json(todos)
  } catch (err) {
    console.error(err)
  }
})
//create a todo
app.post('/todos', async(req,res)=>{
  const {user_email, title, progress, date} =req.body;
  const id = uuidv4();
  try {
    const newTodo = await createItem(id, user_email, title, progress, date);
    console.log(newTodo)
    res.json(newTodo)
  } catch (error) {
    console.log(error)
  }
})
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))