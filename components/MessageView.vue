<template>
  <div>
    <v-card-text v-for="message in messages" :key="message.id">
      {{message.message}}
    </v-card-text>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MessageStore } from '~/store'

export default Vue.extend({
  name: 'MessageView',
  computed: {
    messages: function () {
      return MessageStore.getMessages
    } 
  }
})
</script>
