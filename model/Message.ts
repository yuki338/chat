import mysql from 'mysql'
const connection = require('../model/DbConnection')

module.exports = {
  getMessages: (roomId: Number) => {
    return new Promise ((resolve, reject) => {
      connection.query(
        'select * from message where roomId = ?',
        [roomId],
        (error: mysql.MysqlError, items: any) => {
          if (error) {
            reject(error)
          }
          resolve(items)
        }
      )
    })
  }
}
