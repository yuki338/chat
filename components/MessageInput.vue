<template>
  <div>
    <v-text-field
      v-model="input"
      clearable
      :append-outer-icon="'mdi-send'"
      @click:append-outer="send"
    ></v-text-field>
    <v-btn block @click="test">click</v-btn>
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
      console.log('test')
      MessageStore.sendMessage(this.input)
    },
    test: function () {
      console.log('start')
      MessageStore.apiTest()
    },
  },
})
</script>
