<template>
  <div>
    <v-text-field
      v-model="input"
      clearable
      :append-outer-icon="'mdi-send'"
    ></v-text-field>
  </div>
</template>

<script lang="ts">
export default {
  name: 'messageBox',
  data() {
    return {
      input: 'test'
    }
  }
}
</script>
