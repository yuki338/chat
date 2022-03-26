<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <message-input></message-input>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import MessageInput from '~/components/MessageInput.vue'
export default {
  components: { MessageInput },
  name: 'IndexPage',
}
</script>
