<template>
  <div class="fluent-card">
    <div class="fluent-card__header" v-if="title || $slots.header">
      <div class="fluent-card__icon" v-if="icon || iconClass">
        <v-img :src="icon" v-if="icon" alt="" />
        <span :class="iconClass" v-else-if="iconClass"></span>
      </div>
      <slot name="header">
        <h3 class="fluent-card__title">{{ title }}</h3>
      </slot>
    </div>
    <div class="fluent-card__content">
      <slot>{{ text }}</slot>
    </div>
    <div class="fluent-card__footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  iconClass: {
    type: String,
    default: '',
  }
});
</script>

<style scoped lang="scss">
.fluent-card {
  background: var(--background-fill-color-layer-alt);
  border: 1px solid var(--stroke-color-control-stroke-default);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    span {
      font-size: 24px;
      color: var(--fill-color-accent-default);
    }
  }

  &__title {
    font-family: var(--font-family-base);
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    color: var(--fill-color-text-primary);
  }

  &__content {
    font-family: var(--font-family-base);
    font-size: 14px;
    line-height: 20px;
    color: var(--fill-color-text-secondary);
    flex-grow: 1;
  }

  &__footer {
    margin-top: auto;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
