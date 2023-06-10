<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <message-view></message-view>
      <message-input v-if="this.$auth.loggedIn" :authId="$auth.user.sub"></message-input>
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
      socket: io('http://chat-local.com'),
      messages: [],
    }
  },
  mounted() {
    this.socket.on('new-message', (message) => {
      MessageStore.add(message)
    })

    // ログイン中のみ実行
    if (this.$auth.loggedIn) {
      const params = {
        authId: this.$auth.user.sub,
        name: this.$auth.user.name,
        picture: this.$auth.user.picture
      }
      const { data } = this.$axios.post(
        '/api/auth',
        params
      )
        .catch(err => {
          console.log('error: ')
          console.log(err.response)
          return err.response
        })
    }
  },
  async fetch() {
    await MessageStore.fetchMessages()
  },
  components: { MessageInput, MessageView },
  name: 'IndexPage',
}
</script>
