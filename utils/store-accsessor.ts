/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Message from '~/store/message'
import Room from '~/store/room'

let MessageStore: Message
let RoomStore: Room
function initialiseStores(store: Store<any>): void {
  MessageStore = getModule(Message, store)
  RoomStore = getModule(Room, store)
}

export { initialiseStores, MessageStore, RoomStore }
