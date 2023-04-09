import socketIO from 'socket.io'
const Message = require('../model/Message')
const User = require('../model/User')

export default function ioModule (option) {
  this.nuxt.hook('listen', (server, listener) => {
    const io = socketIO(server)

    io.on('connection', (socket) => {
      // メッセージ受信時の処理
      socket.on('send-message', (request) => {
        // 送信元ユーザーを取得
        User.getUserByAuthId(request.authId)
          .then((fromUser) => {
            // 送信元ユーザーが見つかればメッセージ登録
            if (fromUser) {
              // メッセージレコード作成
              Message.insertMessage(request.message, fromUser.userId, request.roomId)
                .then((message) => {
                  socket.broadcast.emit('new-message', message)
                })
            }
          })
      })
    })
  })
}