import mysql from 'mysql'
import { format } from 'date-fns'
import { MessageRecord } from '~/types/types'
const connection: mysql.Connection = require('../model/DbConnection')

module.exports = {
  getMessages: (roomId: Number) => {
    return new Promise ((resolve, reject) => {
      connection.query(
        'select * from message where roomId = ?',
        [roomId],
        (error: mysql.MysqlError|null, items: Array<MessageRecord>) => {
          if (error) {
            reject(error)
          }
          resolve(items)
        }
      )
    })
  },

  insertMessage: (message: string, roomId: Number, userId: Number) => {
    const now = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    const params = [
      roomId,
      message,
      userId,
      now
    ]
    return new Promise ((resolve, reject) => {
      connection.query(
        'insert into message (roomId, message, userId, dateTime) values (?, ?, ?, ?)',
        params,
        (error: mysql.MysqlError|null, result: mysql.OkPacket) => {
          if (error) {
            reject(error)
          }
          connection.query(
            'select * from message where messageId = ?',
            [result.insertId],
            (error, items: Array<MessageRecord>) => {
              if (error) {
                reject(error)
              }
              const item = items.shift()
              resolve (item)
            }
          )
        }
      )
    })
  }
}
