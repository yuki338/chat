import socketIO from 'socket.io'
const Message = require('../model/Message')

export default function ioModule (option) {
  this.nuxt.hook('listen', (server, listener) => {
    const io = socketIO(server)

    io.on('connection', (socket) => {
      // メッセージ受信時の処理
      socket.on('send-message', (request) => {
        // メッセージレコード作成
        Message.insertMessage(request.message, request.roomId, request.userId)
          .then((message) => {
            socket.broadcast.emit('new-message', message)
          })
      })
    })
  })
}