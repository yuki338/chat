import mysql from 'mysql'
import { format } from 'date-fns'
import { MessageView } from '~/types/types'
const connection: mysql.Connection = require('../model/DbConnection')

module.exports = {
  getMessages: (roomId: number) => {
    return new Promise ((resolve, reject) => {
      const select = 'select message.*, user.picture, user.name '
      const from   = 'from message left join user on message.userId = user.userId '
      let where    = 'where message.deleteFlg = ? '
      const order  = 'order by message.dateTime, message.messageId '
      const params = [0];
      if (roomId != 0) {
        where += 'and message.roomId = ? '
        params.push(roomId)
      }
      connection.query(
        select + from + where + order + ';',
        params,
        (error: mysql.MysqlError|null, items: Array<MessageView>) => {
          if (error) {
            reject(error)
          }
          resolve(items)
        }
      )
    })
  },

  insertMessage: (message: string, userId: Number, roomId: Number) => {
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
            'select message.*, user.picture, user.name from message left join user on message.userId = user.userId where message.messageId = ?',
            [result.insertId],
            (error, items: Array<MessageView>) => {
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
