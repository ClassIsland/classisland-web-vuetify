<script setup lang="ts">
const props = defineProps({
  platformName: String,
  platformIcon: String,
  description: String
});
</script>

<template>
  <div class="align-content-center d-flex flex-column align-center download-card-root ga-2" >
    <p class="text-h5">{{ props.platformName }}</p>
    <v-icon :icon="props.platformIcon" class="platform-icon"/>
    <p class="text-center">{{ props.description }}</p>
    <div class="d-flex gc-2">
      <slot/>
    </div>
  </div>
</template>

<style scoped>
.platform-icon {
  font-size: 72px;
}

.download-card-root {
  max-width: 320px;
}
</style>
