import express from "express"
import { MessageRecord, MessageView } from "~/types/types"
const Message = require('../model/Message')

module.exports = {
  getMessages: (req: express.Request, res: express.Response) => {
    if (! req.params) {
      res.send([])
    }
    const roomId = req.query.roomId ?? ''
    Message.getMessages(roomId).then((messages: Array<MessageView>) => {
      res.send(messages)
    })
  },

  sendMessage: (req: express.Request, res: express.Response) => {
    // メッセージ未設定はエラーを返す
    const message = req.body.message ?? ''
    if (message == '') {
      console.log(req.body.message)
      res.send(false)
      return
    }
    const roomId = req.body.roomId ?? ''
    const userId = req.body.userId ?? 0
    Message.insertMessage(message, roomId, userId)
      .then((message: MessageRecord) => {
        res.send(message)
      })
  }
}
