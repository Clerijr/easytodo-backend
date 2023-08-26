const app = require('./app')
const PORT = process.env.port || 3001
const HOST = 'localhost'

app.listen(PORT, () => {
    console.log('Server running on ' + HOST + ':' +  PORT)
})
