import express from "express"
import mysql from "mysql"
import { format } from "date-fns"

const { body, validationResult } = require('express-validator/check')
const app = express()

type Message = {
  messageId: Number,
  roomId: Number,
  message: String,
  userId: Number,
  dateTime: Date,
  deleteFlg: Number
}

app.use(express.json())

module.exports = {
  path: '/api',
  handler: app
}

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: 3306,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
})

app.get('/rooms', (req: express.Request, res: express.Response) => {
  connection.query('select * from room', (error: mysql.MysqlError, items: any) => {
    if (error) {
      throw error
    }
    res.send(items)
  })
})

app.get('/messages', (req: express.Request, res: express.Response) => {
  if (! req.params) {
    res.send([])
    console.log(req.query.roomId)
  }
  const roomId = req.query.roomId ?? ''
  connection.query('select * from message where roomId = ?', [roomId], (error, items) => {
    if (error) {
      throw error
    }
    res.send(items)
  })
})

app.post('/send', (req: express.Request, res: express.Response) => {
  if (! req.params) {
    res.send([])
    console.log(req.query.roomId)
  }
  if (req.query.message == '') {
    res.send(false)
  }
  const params = [
    req.query.roomId ?? '',
    req.query.message ?? '',
    req.query.userId ?? 0,
    format(new Date(), 'yyyy-MM-dd HH:mm:ss')
  ]
  connection.query('insert into message (roomId, message, userId, dateTime) values (?, ?, ?, ?)', params, (error, items) => {
    if (error) {
      throw error
    }
    res.send(true)
  })
})
