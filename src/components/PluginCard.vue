<template>
  <a :href="url" target="_blank" class="plugin-card-link">
    <div class="fluent-card plugin-card">
      <div class="fluent-card__header d-flex flex-row gc-4">
        <div class="fluent-card__icon-container">
          <v-img :src="icon" v-if="icon" class="fluent-card__icon" alt="Plugin Icon" width="48px" height="48px" />
          <FluentSystemIcon v-else name="box" class="fluent-card__icon-fallback" :size="48" />
        </div>
        <div class="fluent-card__title-group">
          <h3 class="fluent-card__title">{{ title }}</h3>
          <div class="fluent-card__content opacity-75 text-sm">
            {{ description }}
          </div>
        </div>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import FluentSystemIcon from './FluentSystemIcon.vue';

const props = defineProps({
  title: String,
  author: String,
  description: String,
  url: String,
  icon: String,
});
</script>

<style scoped lang="scss">
.plugin-card-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-basis: 292px;
  flex-grow: 1;
  /* Ensure max-width isn't unbounded */
  max-width: 100%;

  @media (min-width: 600px) {
      max-width: calc(50% - 8px); /* 2 per row minus gap approximation */
  }
  @media (min-width: 960px) {
      max-width: calc(33.333% - 8px); /* 3 per row */
  }
  @media (min-width: 1280px) {
      max-width: calc(25% - 8px); /* 4 per row */
  }
}

.plugin-card {
  width: 100%;
  height: 100%; /* Fill the link container */
  background: var(--background-fill-color-layer-alt);
  border: 1px solid var(--stroke-color-control-stroke-default);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
    background: var(--background-fill-color-layer-default);
  }

  .fluent-card__header {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .fluent-card__icon-container {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: start;
    //background: var(--fill-color-control-alt-secondary);
    border-radius: 4px;
    overflow: hidden;
    flex-shrink: 0;
  }

  .fluent-card__icon {
    width: 100%;
    height: 100%;
  }

  .fluent-card__icon-fallback {
    font-size: 24px;
    color: var(--fill-color-text-secondary);
  }

  .fluent-card__title-group {
    display: flex;
    flex-direction: column;
    min-width: 0; /* Allow text truncation */
  }

  .fluent-card__title {
    font-family: var(--font-family-base);
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    color: var(--fill-color-text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .fluent-card__content {
    font-family: var(--font-family-base);
    font-size: 14px;
    line-height: 20px;
    color: var(--fill-color-text-secondary);
    margin-top: 4px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @media (max-width: 750px) {
    padding: 12px;
    align-items: center;
    justify-content: center;
    gap: 0;

    .fluent-card__header {
      justify-content: center;
    }

    .fluent-card__title-group,
    .fluent-card__content {
      display: none;
    }
  }
}
</style>
