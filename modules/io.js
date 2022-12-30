import socketIO from 'socket.io'

export default function ioModule (option) {
  this.nuxt.hook('listen', (server, listener) => {
    const io = socketIO(server)

    io.on('connection', (socket) => {
      socket.on('send-message', (message) => {
        socket.broadcast.emit('new-message', message)
      })
    })
  })
}