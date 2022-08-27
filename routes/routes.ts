import express from 'express'
const RoomController = require('../controllers/RoomController')

const app = express()

app.use(express.json())

app.get('/rooms', RoomController.getRooms)

export default app
