const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const server = express()

server.use(cors())
server.use(helmet())
server.use(express.json())

async function getAllData() {
    const allData = await prisma.tasks.findMany();
    return allData;
}


server.get('/', (req, res) => {
    res.send('Hello World')
})

server.get('/todos', async (req, res) => {
    //GET all todos
    return getAllData().then(data => {
        return res.send(data)
    })
})

server.get('/todos/id', (req, res) => {
    //GET todo by id
})

server.patch('/todos/:id', (req, res) => {
    //PATCH todo by id
})

server.post('/todos', async (req, res) => {
    //POST todo
    try {
        await prisma.tasks.create({
            data: req.body
        }).then(data => {
            return res.send('Created' + data)
        })
    } catch (error) {
        console.log(error)
    }
})

server.put('/todos/:id', (req, res) => {
    //UPDATE todo
})

server.delete('/todos/:id', (req, res) => {
    //DELETE todo
})

module.exports = server