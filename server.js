const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const server = express()

server.use(cors())
server.use(helmet())
server.use(express.json())

server.get('/', (req, res) => {
    res.send('Hello World')
})

server.get('/todos', (req, res) => {
    //GET all todos
})

server.get('/todos/id', (req, res) => {
    //GET todo by id
})

server.patch('/todos/:id', (req, res) => {
    //PATCH todo by id
})

server.post('/todos', (req, res) => {
    //POST todo
})

server.put('/todos/:id', (req, res) => {
    //UPDATE todo
})

server.delete('/todos/:id', (req, res) => {
    //DELETE todo
})

module.exports = server