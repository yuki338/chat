import express from 'express'
const RoomController = require('../controllers/RoomController')
const MessageController = require('../controllers/MessageController')
const AuthController = require('../controllers/AuthController')

const app = express()

app.use(express.json())

app.get('/rooms', RoomController.getRooms)
app.get('/messages', MessageController.getMessages)
app.post('/auth', AuthController.auth)

export default app
