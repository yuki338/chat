import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { $axios } from '~/utils/api'
import { MessageView } from '~/types/types'
import { io } from 'socket.io-client'
const socket = io('http://chat-local.com')

@Module({
  name: 'message',
  stateFactory: true,
  namespaced: true,
})
export default class Messages extends VuexModule {
  private messages: MessageView[] = []

  public get getMessages() {
    return this.messages
  }

  @Mutation
  private add(messageResponse: MessageView) {
    const message: MessageView = {
      messageId: messageResponse.messageId,
      roomId: messageResponse.roomId,
      message: messageResponse.message,
      userId: messageResponse.userId,
      picture: messageResponse.picture,
      name: messageResponse.name,
      dateTime: messageResponse.dateTime,
      deleteFlg: messageResponse.deleteFlg,
    }
    this.messages.push(message)
  }

  @Action({ rawError: true })
  public async sendMessage(
    payload: {
      message: String,
      authId: String,
      roomId: String
    }
  ) {
    await socket.emit('send-message', {
      message: payload.message,
      authId: payload.authId,
      roomId: payload.roomId
    })
  }

  @Action({ rawError: true })
  public async fetchMessages() {
    const response = await $axios.$get('/api/messages', {
      params: { roomId: '' },
    })
    response.forEach((messageResponse: MessageView) => {
      this.add(messageResponse)
    })
  }
}
