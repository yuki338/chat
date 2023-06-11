import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { $axios } from '~/utils/api'
import { MessageView } from '~/types/types'
import { Socket } from 'socket.io-client'

@Module({
  name: 'message',
  stateFactory: true,
  namespaced: true,
})
export default class Messages extends VuexModule {
  /**
   * messages
   */
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

  @Mutation
  private messagesClear() {
    this.messages = []
  }

  @Action({ rawError: true })
  public async sendMessage(
    payload: {
      socket: Socket,
      message: String,
      authId: String,
      roomId: number
    }
  ) {
    await payload.socket.emit('send-message', {
      message: payload.message,
      authId: payload.authId,
      roomId: payload.roomId
    })
  }

  @Action({ rawError: true })
  public async fetchMessages(payload: {browseRoomId: number}) {
    const response = await $axios.$get('/api/messages', {
      params: { roomId: payload.browseRoomId },
    })
    this.messagesClear()
    response.forEach((messageResponse: MessageView) => {
      this.add(messageResponse)
    })
    this.setBrowseRoomId(payload.browseRoomId)
  }

  /**
   * browseRoomId
   */
  private browseRoomId: number = 0

  public get getBrouseRoomId() {
    return this.browseRoomId
  }

  @Mutation
  private setBrowseRoomId(roomId: number) {
    this.browseRoomId = roomId
  }
}
