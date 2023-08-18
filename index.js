const server = require('./server')

const PORT = process.env.port || 3000
const HOST = 'localhost'



server.listen(PORT, () => {
    console.log('Server running on port ' + HOST + ':' +  PORT)
})
