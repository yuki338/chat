import express from "express"

const { body, validationResult } = require('express-validator/check')
const app = express()

app.use(express.json())

module.exports = {
  path: '/api',
  handler: app
}

app.get('/test', (req: express.Request, res: express.Response) => {
  res.send('Hello World!')
})
