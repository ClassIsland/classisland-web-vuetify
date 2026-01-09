<script setup lang="ts">
const props = defineProps({
  platformName: String,
  platformIcon: String,
  description: String,
  version: String
});
</script>

<template>
  <v-card class="justify-center d-flex card " variant="flat">
    <div class="align-content-center d-flex flex-column align-center download-card-root ga-2 py-8 px-4 align-self-center flex-grow-1">
      <div class="align-content-center d-flex flex-column align-center ga-2 flex-grow-1">
        <v-icon :icon="props.platformIcon" class="platform-icon"/>
        <p class="text-h4 font-weight-medium">{{ props.platformName }}</p>
        <p class="text-center description">{{ props.description }}</p>
        <p class="text-center version" v-if="version">当前版本：{{ props.version }}</p>
      </div>

      <div class="d-flex gc-2 mt-6">
        <slot/>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.platform-icon {
  font-size: 56px;
}

.download-card-root {
  //height: 320px
}

.version {
  font-size: 13px;
  opacity: 75%;
}

.description {
  font-size: 14px;
  opacity: 75%;
}


</style>
