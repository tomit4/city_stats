'use strict'
// Server connection
const server = require('./app.js')

let connections = []
server.on('connection', connection => {
    connections.push(connection)
    connection.on('close', () =>
        (connections = connections.filter(curr =>
            curr !== connection)),
    )
})

// Shutdown configuration
const shutDown = () => {
    server.close(() => {
        console.log('closing server with exit code 0...')
        process.exit(0)
    })
    setTimeout(() => {
        console.error('failure to close server properly...')
        console.error('exit code 1...')
        process.exit(1)
    }, 10000)
    connections.forEach(curr => curr.end())
    setTimeout(() =>
        connections.forEach(curr => curr.destroy()), 5000)
}

process.on('SIGTERM', shutDown)
process.on('SIGINT', shutDown)
