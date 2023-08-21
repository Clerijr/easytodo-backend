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
    res.send('welcome, easytodo-backend')
})

//POST todo
server.post('/todos', async (req, res) => {
    try {
        await prisma.tasks.create({
            data: req.body
        }).then(data => {
            return res.send('Success')
        })
    } catch (error) {
        console.log(error)
    }
})

//GET all todos
server.get('/todos', async (req, res) => {
    return getAllData().then(data => {
        return res.send(data)
    })
})

//GET todo by id
server.get('/todos/:id', async (req, res) => {
    const { id } = req.params
    const task = await prisma.tasks.findUnique({
        where: {
            id: Number(id)
        }
    })
    return res.send(task)
})

// Check necessity of patch and put here, maybe for more advanced features only, not for now
//PATCH todo by id
server.patch('/todos/:id', async (req, res) => {
    const { id } = req.params
    return await prisma.tasks.update({
        where: {
            id: Number(id)
        },
        data: req.body
    }).then(data => {
        return res.send('Success')
    })
})

//UPDATE todo
server.put('/todos/:id', async (req, res) => {
    const { id } = req.params
    return await prisma.tasks.update({
        where: {
            id: Number(id)
        },
        data: req.body
    }).then(data => {
        return res.send('Success')
    })
})

//DELETE todo
server.delete('/todos/:id', async (req, res) => {
    const { id } = req.params
    return await prisma.tasks.delete({
        where: {
            id: Number(id)
        }
    }).then(data => {
        return res.send('Success')
    })
})

module.exports = server