<template>
  <div>
    <v-card v-for="message in messages" :key="message.messageId" outlined>
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="message.picture"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-subtitle class="text-subtitle-2">
            {{ message.name }}
          </v-list-item-subtitle>
          <v-list-item-subtitle class="text-body-1">
            {{ message.message }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
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
    },
  },
})
</script>
