<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <message-view></message-view>
      <message-input></message-input>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import MessageInput from '~/components/MessageInput.vue'
import MessageView from '~/components/MessageView.vue'
export default {
  components: { MessageInput, MessageView },
  name: 'IndexPage',
}
</script>
