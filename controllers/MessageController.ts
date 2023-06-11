import express from "express"
import { MessageView } from "~/types/types"
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
  }
}
