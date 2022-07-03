import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { $axios } from '~/utils/api'
import { MessageRecord } from '~/types/types'

@Module({
  name: 'message',
  stateFactory: true,
  namespaced: true,
})
export default class Messages extends VuexModule {
  private messages: MessageRecord[] = []

  public get getMessages() {
    return this.messages
  }

  @Mutation
  private add(messageResponse: MessageRecord) {
    const message: MessageRecord = {
      messageId: messageResponse.messageId,
      roomId: messageResponse.roomId,
      message: messageResponse.message,
      userId: messageResponse.userId,
      dateTime: messageResponse.dateTime,
      deleteFlg: messageResponse.deleteFlg,
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
    response.forEach((messageResponse: MessageRecord) => {
      this.add(messageResponse)
    })
  }
}
