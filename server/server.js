const PORT = process.env.PORT ?? 8000
const express = require('express')
const app = express()
const {v4: uuidv4} = require('uuid');
const {fetchItems, queryItems, createItem, editItem, deleteItem, signUp} = require('./dynamoDB')
const dotenv = require('dotenv')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


app.use(cors())
app.use(express.json())
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

// get queryTodos
app.get('/todos/:userEmail', async (req, res) => {
  const {userEmail} = req.params;
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

//edit Data
app.put('/todos/:id', async (req, res) => {
  const {id} = req.params;
  const {user_email, title, progress, date} =req.body;
  try {
    const editTodo = await editItem(id, user_email, title, progress, date);
    res.json(editTodo)
  } catch (error) {
    console.log(error)
  }
})

//delete Data
app.delete('/todos/:id', async(req,res)=>{
  const {id}=req.params;
  const {user_email, title, progress, date} = req.body
  try {
    const deleteTodo = await deleteItem(id, user_email, title, progress, date);
    res.json(deleteTodo)
  } catch (error) {
    console.log(error)
  }
})

//signup
app.post('/signup', async(req,res)=>{
  const {email, password}= req.body
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)
  try {
    const signup = await signUp(email, hashedPassword)
    res.json({email, password, signup})
  } catch (error) {
    console.log(error)
  }
})
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))