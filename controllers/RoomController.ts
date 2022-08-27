import express from "express"
const Room = require('../model/Room')

module.exports = {
  getRooms: (req: express.Request, res: express.Response) => {
    Room.getRooms().then((rooms: any) => {
      res.send(rooms)
    })
  }
}
