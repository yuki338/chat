<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <message-view></message-view>
      <message-input></message-input>
    </v-col>
  </v-row>
</template>

<script>
import MessageInput from '~/components/MessageInput.vue'
import MessageView from '~/components/MessageView.vue'
import { MessageStore } from '~/store'
import { io } from 'socket.io-client'

export default {
  data() {
    return {
      socket: io('http://localhost:3000'),
      messages: [],
    }
  },
  mounted() {
    this.socket.emit('send-message', 'test')
    this.socket.on('new-message', (message) => {
      console.log(message)
      this.messages.push(message)
    })
  },
  async fetch() {
    await MessageStore.fetchMessages()
  },
  components: { MessageInput, MessageView },
  name: 'IndexPage',
}
</script>
