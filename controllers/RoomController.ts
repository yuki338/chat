import express from "express"
import mysql from 'mysql'

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: 3306,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
})

module.exports = {
  getRooms: function (req: express.Request, res: express.Response) {
    connection.query(
      'select * from room',
      (error: mysql.MysqlError, items: any) => {
        if (error) {
          throw error
        }
        res.send(items)
      }
    )
  }
}
