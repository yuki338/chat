<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <message-box></message-box>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import messageBox from '~/components/messageBox.vue'
export default {
  components: { messageBox },
  name: 'IndexPage',
}
</script>
