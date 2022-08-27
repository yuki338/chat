import mysql from 'mysql'

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: 3306,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
})

module.exports = connection
