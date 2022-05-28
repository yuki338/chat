import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { $axios } from '~/utils/api'

type Message = {
  id: Number
  message: String
  date: Date
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
  private add(message: Message) {
    this.messages.push(message)
  }

  @Action({ rawError: true })
  public sendMessage(text: String) {
    const id: Number = this.messages.length + 1
    const message: Message = {
      id: id,
      message: text,
      date: new Date,
    }
    this.add(message)
  }

  @Action({ rawError: true })
  public async apiTest() {
    const response = await $axios.$get('/api/test', { params: {id: 1} })
    console.log(response)
  }
}