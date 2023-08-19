const server = require('./server')
const { Sequelize } = require('sequelize')


const PORT = process.env.port || 3001
const HOST = 'localhost'



server.listen(PORT, () => {
    console.log('Server running on ' + HOST + ':' +  PORT)
})
