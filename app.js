const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('welcome, easytodo-backend')
})

//POST todo
app.post('/todos', async (req, res) => {
    try {
        await prisma.task.create({
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
    //res.set('Access-Control-Allow-Origin', '*')
    try {
        const allData = await prisma.task.findMany();
        res.json(allData);
      } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
})

//GET todo by id
app.get('/todos/:id', async (req, res) => {
    const { id } = req.params
    const task = await prisma.task.findUnique({
        where: {
            id: Number(id)
        }
    })
    if(!task) {
        return res.status(404).send('Not found')
    }
    return res.send(task)
})

// Check necessity of patch and put here, maybe for more advanced features only, not for now
//PATCH todo by id
app.patch('/todos/:id', async (req, res) => {
    const { id } = req.params
    return await prisma.task.update({
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
    return await prisma.task.update({
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
    return await prisma.task.delete({
        where: {
            id: Number(id)
        }
    }).then(data => {
        return res.send('Success')
    })
})

module.exports = app