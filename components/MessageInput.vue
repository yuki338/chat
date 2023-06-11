<template>
  <div>
    <v-text-field
      v-model="input"
      clearable
      :append-outer-icon="'mdi-send'"
      @click:append-outer="send"
    ></v-text-field>
  </div>
</template>

<script lang="ts">
import { io } from 'socket.io-client'
import Vue from 'vue'
import { MessageStore } from '~/store'

export default Vue.extend({
  name: 'MessageInput',
  props: {
    authId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      input: '',
      socket: io(this.$config.baseURL)
    }
  },
  computed: {
    browseRoomId: function () {
      return MessageStore.getBrouseRoomId
    }
  },
  methods: {
    send: async function () {
      // 部屋未選択は送信しない
      if (this.browseRoomId == 0) return
      await MessageStore.sendMessage({
        socket: this.socket,
        message: this.input,
        authId: this.authId,
        roomId: this.browseRoomId
      })
    },
  },
})
</script>
