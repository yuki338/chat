import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { $axios } from '~/utils/api'

type Message = {
  id: Number
  message: String
  date: Date
}

type MessageResponse = {
  messageId: Number
  roomId: String
  message: String
  userId: Number
  dateTime: Date
  deleteFlg: Number
}

@Module({
  name: 'message',
  stateFactory: true,
  namespaced: true,
})
export default class Messages extends VuexModule {
  private messages: Message[] = []

  public get getMessages() {
    return this.messages
  }

  @Mutation
  private add(messageResponse: MessageResponse) {
    const message: Message = {
      id: messageResponse.messageId,
      message: messageResponse.message,
      date: new Date(messageResponse.dateTime),
    }
    this.messages.push(message)
  }

  @Action({ rawError: true })
  public async sendMessage(
    message: String,
    roomId: String = '',
    userId: Number = 0
  ) {
    const messageResponse = await $axios.$post('/api/send', {
      message: message,
      roomId: roomId,
      userId: userId,
    })
    this.add(messageResponse)
  }

  @Action({ rawError: true })
  public async fetchMessages() {
    const response = await $axios.$get('/api/messages', {
      params: { roomId: '' },
    })
    response.forEach((messageResponse: MessageResponse) => {
      this.add(messageResponse)
    })
  }
}
