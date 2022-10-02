import mysql from 'mysql'
const connection = require('../model/DbConnection')

module.exports = {
  getRooms: () => {
    return new Promise ((resolve, reject) => {
      connection.query(
        'select * from room',
        (error: mysql.MysqlError, items: any) => {
          if (error) {
            reject(error)
          }
          resolve(items)
        }
      )
      connection.end()
    })
  }
}
