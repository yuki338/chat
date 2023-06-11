import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { $axios } from '~/utils/api'
import { RoomRecord } from '~/types/types'

const unSelectRoom: RoomRecord = {
  roomId: 0,
  name: 'すべて',
  deleteFlg: 0
}

@Module({
  name: 'room',
  stateFactory: true,
  namespaced: true,
})
export default class Rooms extends VuexModule {
  /**
   * rooms
   */
  private rooms: RoomRecord[] = [unSelectRoom]

  public get getRooms() {
    return this.rooms
  }

  @Mutation
  private add(roomRecord: RoomRecord) {
    this.rooms.push(roomRecord)
  }

  @Mutation
  private roomsClear() {
    this.rooms = [unSelectRoom]
  }

  @Action({ rawError: true })
  public async fetchRooms() {
    const response = await $axios.$get('/api/rooms')
    this.roomsClear()
    response.forEach((roomResponse: RoomRecord) => {
      this.add(roomResponse)
    })
  }
}
