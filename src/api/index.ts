import e from "express"

const express = require('express')
const { body, validationResult } = require('express-validator/check')
const app = express()

app.use(express.json())

module.exports = {
  path: '/api',
  handler: app
}

app.get('/test', (req: e.Request, res: e.Response) => { // eslint-disable-line
  res.send('Hello World!')
})
