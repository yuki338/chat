import express from 'express'
import mysql from 'mysql'
import { format } from 'date-fns'
import { MessageRecord } from '~/types/types'

const { body, validationResult } = require('express-validator/check')
const app = express()

app.use(express.json())

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: 3306,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
})

app.post('/send', (req: express.Request, res: express.Response) => {
  const message = req.body.message ?? ''
  if (message == '') {
    console.log(req.body.message)
    res.send(false)
    return
  }
  const params = [
    req.body.roomId ?? '',
    message,
    req.body.userId ?? 0,
    format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  ]
  connection.query(
    'insert into message (roomId, message, userId, dateTime) values (?, ?, ?, ?)',
    params,
    (error, result: mysql.OkPacket) => {
      if (error) {
        throw error
      }
      connection.query(
        'select * from message where messageId = ?',
        [result.insertId],
        (error, items: Array<MessageRecord>) => {
          if (error) {
            throw error
          }
          const item = items.shift()
          res.send(item)
        }
      )
    }
  )
})

export default app
