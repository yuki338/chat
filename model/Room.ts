import mysql from 'mysql'
import { RoomRecord } from '~/types/types'
const connection = require('../model/DbConnection')

module.exports = {
  getRooms: () => {
    return new Promise ((resolve, reject) => {
      connection.query(
        'select * from room where deleteFlg = ?',
        [0],
        (error: mysql.MysqlError, items: RoomRecord[]) => {
          if (error) {
            reject(error)
          }
          resolve(items)
        }
      )
    })
  }
}
