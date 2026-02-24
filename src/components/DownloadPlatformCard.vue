<script setup lang="ts">
import { defineProps } from 'vue';
import FluentCard from './fluent/FluentCard.vue';

const props = defineProps({
  platformName: String,
  platformIcon: String,
  description: String,
  version: String
});
</script>

<template>
  <FluentCard class="download-platform-card">
    <div class="download-card-content">
      <div class="icon-container">
        <span :class="['mdi', props.platformIcon]" class="platform-icon"></span>
      </div>
      <h3 class="platform-name">{{ props.platformName }}</h3>
      <p class="description">{{ props.description }}</p>
      <p class="version" v-if="version">当前版本：{{ props.version }}</p>
      <div class="actions">
        <slot/>
      </div>
    </div>
  </FluentCard>
</template>

<style scoped lang="scss">
.download-platform-card {
  height: 100%;
}

.download-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0; /* Adjusted padding */
  gap: 8px;
  flex-grow: 1;
}

.icon-container {
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
}

.platform-icon {
  font-size: 56px;
  color: var(--fill-color-text-primary);
}

.platform-name {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  color: var(--fill-color-text-primary);
  font-family: var(--font-family-base);
}

.description {
  font-size: 14px;
  opacity: 0.75;
  text-align: center;
  color: var(--fill-color-text-secondary);
  font-family: var(--font-family-base);
}

.version {
  font-size: 13px;
  opacity: 0.75;
  text-align: center;
  color: var(--fill-color-text-secondary);
  font-family: var(--font-family-base);
}

.actions {
  display: flex;
  gap: 8px;
  margin-top: 14px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}
</style>
