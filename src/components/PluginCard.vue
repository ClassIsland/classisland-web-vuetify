<script setup lang="ts">
const props = defineProps({
  title: String,
  author: String,
  description: String,
  url: String,
  icon: String
})
</script>

<template>
  <v-card
    class="plugin-card"
    :title="props.title"
    :subtitle="props.author"
    :text="props.description"
    variant="tonal"
    :href="props.url"
    target="_blank"
  >
    <template v-slot:prepend>
      <v-img :src="props.icon" v-if="props.icon" width="48px" height="48px" class="plugin-icon" alt="插件图标"/>
      <v-icon icon="mdi-toy-brick" v-else class="plugin-icon"/>
    </template>
  </v-card>
</template>

<style scoped>
.plugin-card {
  flex-basis: 292px;
  flex-grow: 1;
}

.plugin-icon {
  width: 48px;
  height: 48px;
  font-size: 48px;
}
</style>
