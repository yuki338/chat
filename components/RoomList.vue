<template>
  <v-list>
    <v-list-item v-for="room in rooms" :key="room.roomId">
      <v-list-item-content @click="select(room.roomId)">
        <v-list-item-title class="text-h6">
          {{ room.name }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue'
import { RoomStore, MessageStore } from '~/store'

export default Vue.extend({
  name: 'RoomList',
  computed: {
    rooms: function () {
      return RoomStore.getRooms
    },
  },
  methods: {
    select: function (roomId: number) {
      MessageStore.fetchMessages({browseRoomId: roomId})
    },
  },
})
</script>
