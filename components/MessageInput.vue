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
    }
  },
  methods: {
    send: async function () {
      await MessageStore.sendMessage({
        message: this.input,
        authId: this.authId,
        roomId: ''
      })
    },
  },
})
</script>
