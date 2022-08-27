import express from 'express'
const RoomController = require('../controllers/RoomController')
const MessageController = require('../controllers/MessageController')

const app = express()

app.use(express.json())

app.get('/rooms', RoomController.getRooms)
app.get('/messages', MessageController.getMessages)
app.post('/send', MessageController.sendMessage)

export default app
