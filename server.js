const express = require('express')
const app = express()
require('dotenv').config()
const connection = require('./db')
const users = require('./routes/users')
const port = process.env.PORT || 8080
app.use(express.json())
app.use('/user/verify', users)
app.get('/', (req,res) => {
    res.send("hello")
})
connection()
app.listen(port, ()=> console.log(` app is listening to port ${port}`))