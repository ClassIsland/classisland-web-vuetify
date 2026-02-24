<template>
  <div class="fluent-segmented-control">
    <div
      v-for="item in items"
      :key="item.value"
      class="fluent-segmented-control__item"
      :class="{ 'fluent-segmented-control__item--selected': modelValue === item.value }"
      @click="select(item.value)"
    >
      <span class="fluent-segmented-control__label">{{ item.label }}</span>
      <div v-if="modelValue === item.value" class="fluent-segmented-control__pill"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  items: {
    type: Array as () => Array<{ label: string; value: string | number }>,
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue']);

const select = (value: string | number) => {
  emit('update:modelValue', value);
};
</script>

<style scoped lang="scss">
.fluent-segmented-control {
  display: inline-flex;
  //background: var(--fill-color-control-alt-secondary);
  border-radius: 4px;
  border: 1px var(--stroke-color-control-stroke-default);
  border-style: solid;
  padding: 2px;

  &__item {
    position: relative;
    padding: 4px 12px 10px;
    cursor: pointer;
    border-radius: 3px;
    transition: background-color 0.2s;
    font-family: var(--font-family-base);
    font-size: 14px;
    line-height: 20px;
    color: var(--fill-color-text-primary);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 60px;

    &:hover:not(&--selected) {
        background-color: var(--fill-color-control-alt-secondary); // Slightly darker
    }

    &--selected {
      background-color: var(--fill-color-control-default);
      box-shadow: 0 1px 2px rgba(0,0,0,0.1);
      font-weight: 600;
    }
  }

  &__label {
    display: inline-block;
    margin-bottom: 0;
  }

  &__pill {
    position: absolute;
    left: 50%;
    bottom: 2px;
    width: 16px;
    height: 3px;
    background-color: var(--fill-color-accent-default);
    transform: translateX(-50%) scaleX(1);
    transform-origin: center;
    border-radius: 99px;
    animation: segmented-pill-expand 180ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }
}

@keyframes segmented-pill-expand {
  from {
    opacity: 0.3;
    transform: translateX(-50%) scaleX(0.3);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) scaleX(1);
  }
}
</style>
