const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())

async function getAllData() {
    const allData = await prisma.tasks.findMany();
    return allData;
}


app.get('/', (req, res) => {
    res.send('welcome, easytodo-backend')
})

//POST todo
app.post('/todos', async (req, res) => {
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
app.get('/todos', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    return getAllData().then(data => {
        return res.send(data)
    })
})

//GET todo by id
app.get('/todos/:id', async (req, res) => {
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
app.patch('/todos/:id', async (req, res) => {
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
app.put('/todos/:id', async (req, res) => {
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
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params
    return await prisma.tasks.delete({
        where: {
            id: Number(id)
        }
    }).then(data => {
        return res.send('Success')
    })
})

module.exports = app