const express = require('express')
const { body, validationResult } = require('express-validator/check')
const app = express()

app.use(express.json())

module.exports = {
  path: '/api',
  handler: app
}

app.get('/test', (req, res) => {
  console.log('api called')
  res.send('Hello World!')
})
