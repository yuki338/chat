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
  host: 'db',
  port: 3306,
  database: 'chat',
  user: 'chat',
  password: 'uZ6pdcFT'
})

app.get('/test', (req: express.Request, res: express.Response) => {
  console.log(process.env.MYSQL_HOST)
  connection.query('select * from test', (error: mysql.QueryError, items: any) => {
    if (error) {
      throw error
    }
    res.send(items)
  })
})
