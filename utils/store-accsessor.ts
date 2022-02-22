
/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Message from '~/store/message'

let MessageStore: Message
function initialiseStores(store: Store<any>): void {
  MessageStore = getModule(Message, store)
}

export { initialiseStores, MessageStore }