import express from "express"
import { MessageRecord } from "~/types/types"
const Message = require('../model/Message')

module.exports = {
  getMessages: (req: express.Request, res: express.Response) => {
    if (! req.params) {
      res.send([])
      console.log(req.query.roomId)
    }
    const roomId = req.query.roomId ?? ''
    Message.getMessages(roomId).then((messages: Array<MessageRecord>) => {
      res.send(messages)
    })
  }
}
