export interface MessageRecord {
  messageId: Number
  roomId: String
  message: String
  userId: Number
  dateTime: Date
  deleteFlg: Number
}

export interface MessageView {
  messageId: Number
  roomId: String
  message: String
  userId: Number
  picture: String
  name: String
  dateTime: Date
  deleteFlg: Number
}

export interface UserRecord {
  userId: Number
  name: String
  authId: String
  picture: String
  deleteFlg: Number
}

export interface RoomRecord {
  roomId: number,
  name: string,
  deleteFlg: number
}
