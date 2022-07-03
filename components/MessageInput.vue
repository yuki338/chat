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
  data() {
    return {
      input: 'test',
    }
  },
  methods: {
    send: function () {
      MessageStore.sendMessage(this.input)
    },
  },
})
</script>
