<template>
  <div class="fluent-expander" :class="{ 'fluent-expander--expanded': isExpanded }">
    <div class="fluent-expander__header" @click="toggle">
      <div class="fluent-expander__icon-container">
        <span :class="['mdi', icon]" v-if="icon" class="fluent-expander__icon"></span>
      </div>
      <div class="fluent-expander__title-container">
        <div class="fluent-expander__title">{{ title }}</div>
        <div class="fluent-expander__description" v-if="description">
          {{ description }}
        </div>
      </div>
      <div class="fluent-expander__chevron">
        <span class="mdi mdi-chevron-down"></span>
      </div>
    </div>
    <transition name="expand">
      <div class="fluent-expander__content" v-if="isExpanded">
        <div class="fluent-expander__content-inner">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  expanded: {
    type: Boolean,
    default: false,
  },
});

const isExpanded = ref(props.expanded);

const toggle = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<style scoped lang="scss">
.fluent-expander {
  border: 1px solid var(--stroke-color-control-stroke-default);
  border-radius: 4px;
  background: var(--background-fill-color-layer-alt);
  margin-bottom: 4px;
  overflow: hidden;
  transition: all 0.2s ease;

  &__header {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    cursor: pointer;
    min-height: 48px;
    box-sizing: border-box;
    background: var(--background-fill-color-layer-alt);
    transition: background-color 0.1s;

    &:hover {
      background-color: var(--fill-color-control-alt-secondary);
    }
  }

  &__icon-container {
    margin-right: 12px;
    display: flex;
    align-items: center;
    color: var(--fill-color-text-secondary);
  }

  &__icon {
    font-size: 20px;
  }

  &__title-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-family: var(--font-family-base);
    font-size: 14px;
    font-weight: 600;
    color: var(--fill-color-text-primary);
  }

  &__description {
    font-family: var(--font-family-base);
    font-size: 12px;
    color: var(--fill-color-text-secondary);
    margin-top: 2px;
  }

  &__chevron {
    margin-left: 12px;
    color: var(--fill-color-text-secondary);
    transition: transform 0.2s ease;
  }

  &--expanded {
    .fluent-expander__chevron {
      transform: rotate(180deg);
    }
    
    .fluent-expander__header {
        border-bottom: 1px solid var(--stroke-color-control-stroke-default);
    }
  }

  &__content {
    background: var(--background-fill-color-layer-default); /* Slightly distinct background */
  }

  &__content-inner {
    padding: 16px;
    font-family: var(--font-family-base);
    font-size: 14px;
    color: var(--fill-color-text-primary);
    line-height: 20px;
  }
}

/* Expand transition */
.expand-enter-active,
.expand-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
  max-height: 500px; /* Arbitrary large height */
  opacity: 1;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
