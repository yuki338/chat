export interface MessageRecord {
  messageId: Number
  roomId: String
  message: String
  userId: Number
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
