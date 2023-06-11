import express from "express"
import { RoomRecord } from "~/types/types"
const Room = require('../model/Room')

module.exports = {
  getRooms: (req: express.Request, res: express.Response) => {
    Room.getRooms().then((rooms: RoomRecord[]) => {
      res.send(rooms)
    })
  }
}
