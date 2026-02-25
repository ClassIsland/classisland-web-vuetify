<template>
  <div class="fluent-info-bar" :class="[`fluent-info-bar--${severity}`, { 'fluent-info-bar--closable': closable }]">
    <div class="fluent-info-bar__content">
      <div class="fluent-info-bar__icon-container">
        <FluentSystemIcon :name="iconName" class="fluent-info-bar__icon" :size="20" />
      </div>
      <div class="fluent-info-bar__text">
        <span class="fluent-info-bar__title" v-if="title">{{ title }}</span>
        <span class="fluent-info-bar__message">
          <slot>{{ message }}</slot>
        </span>
      </div>
    </div>
    <div class="fluent-info-bar__actions">
      <slot name="actions"></slot>
      <button v-if="closable" class="fluent-info-bar__close-button" @click="$emit('close')">
        <FluentSystemIcon name="dismiss" :size="16" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import FluentSystemIcon from '@/components/FluentSystemIcon.vue';

const props = defineProps({
  severity: {
    type: String,
    default: 'info', // 'info', 'success', 'warning', 'error'
    validator: (value: string) => ['info', 'success', 'warning', 'error'].includes(value),
  },
  title: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: '',
  },
  closable: {
    type: Boolean,
    default: false,
  },
});

const iconName = computed(() => {
  switch (props.severity) {
    case 'success':
      return 'checkmarkCircle';
    case 'warning':
      return 'warning';
    case 'error':
      return 'dismissCircle';
    default:
      return 'info';
  }
});
</script>

<style scoped lang="scss">
.fluent-info-bar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 4px;
  background-color: var(--background-fill-color-card-background-secondary, #f6f6f6);
  border: 1px solid var(--stroke-color-card-stroke-default, rgba(0, 0, 0, 0.06));
  box-sizing: border-box;
  font-family: var(--font-family-base);
  width: 100%;
  gap: 12px;

  &__content {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    flex-grow: 1;
  }

  &__icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  &__icon {
    font-size: 20px;
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 14px;
    line-height: 20px;
    color: var(--fill-color-text-primary);
  }

  &__title {
    font-weight: 600;
  }

  &__message {
    color: var(--fill-color-text-secondary);
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  &__close-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    border-radius: 4px;
    cursor: pointer;
    color: var(--fill-color-text-primary);
    transition: background-color 0.1s;

    &:hover {
      background-color: var(--fill-color-control-alt-secondary);
    }

  }

  /* Severities */
  &--info {
    background-color: var(--background-fill-color-card-background-secondary, #f4f4f4);
    .fluent-info-bar__icon {
      color: var(--fill-color-system-attention, #005fb7); // Info blue
    }
  }

  &--success {
    background-color: var(--background-fill-color-success-background, #dff6dd);
    border-color: var(--stroke-color-success-stroke, #107c10);
    .fluent-info-bar__icon {
      color: var(--fill-color-system-success, #107c10); // Success green
    }
  }

  &--warning {
    background-color: var(--background-fill-color-warning-background, #fff4ce);
    border-color: var(--stroke-color-warning-stroke, #797775); // Warning yellow/orange
    .fluent-info-bar__icon {
        color: var(--fill-color-system-caution, #9d5d00); // Warning icon color
    }
  }

  &--error {
    background-color: var(--background-fill-color-error-background, #fde7e9);
    border-color: var(--stroke-color-error-stroke, #a80000);
    .fluent-info-bar__icon {
      color: var(--fill-color-system-critical, #c50f1f); // Error red
    }
  }
}
</style>
