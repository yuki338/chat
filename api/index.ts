import express from "express"
import mysql from "mysql2"

const { body, validationResult } = require('express-validator/check')
const app = express()

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

app.get('/test', (req: express.Request, res: express.Response) => {
  connection.query('select * from test', (error: mysql.QueryError, items: any) => {
    if (error) {
      throw error
    }
    res.send(items)
  })
})
