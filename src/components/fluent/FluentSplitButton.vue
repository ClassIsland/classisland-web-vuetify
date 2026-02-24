<template>
  <div class="fluent-split-button" ref="container">
    <button class="fluent-split-button__main" @click="onClick">
      <span class="fluent-split-button__text">
        <slot>{{ label }}</slot>
      </span>
    </button>
    <div class="fluent-split-button__divider"></div>
    <button
      class="fluent-split-button__menu-trigger"
      :class="{ 'fluent-split-button__menu-trigger--open': isOpen }"
      @click="toggle"
    >
      <span class="fluent-split-button__icon">
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </button>
    <transition name="fade">
      <div v-if="isOpen" class="fluent-split-button__dropdown">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="fluent-split-button__item"
          @click="select(item)"
        >
          {{ item.label || item }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps, defineEmits } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: 'Button',
  },
  items: {
    type: Array,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click', 'select']);

const isOpen = ref(false);
const container = ref<HTMLElement | null>(null);

const onClick = () => {
  if (props.disabled) return;
  emit('click');
};

const toggle = () => {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
};

const select = (item: any) => {
  emit('select', item);
  isOpen.value = false;
};

const close = (e: MouseEvent) => {
  if (container.value && !container.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('click', close);
});

onUnmounted(() => {
  window.removeEventListener('click', close);
});
</script>

<style scoped lang="scss">
.fluent-split-button {
  position: relative;
  display: inline-flex;
  border-radius: 4px;
  background: var(--fill-color-control-default);
  border: 1px solid transparent;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1); /* Standard button border style */
  height: 32px;
  box-sizing: border-box;

  &__main {
    display: inline-flex;
    align-items: center;
    padding: 5px 12px;
    background: transparent;
    border: none;
    cursor: pointer;
    font-family: var(--font-family-base);
    font-size: 14px;
    color: var(--fill-color-text-primary);
    border-radius: 4px 0 0 4px;

    &:hover {
      background: var(--fill-color-control-default);
      filter: brightness(0.96);
    }

    &:active {
        background: var(--fill-color-control-alt-secondary);
    }
  }

  &__divider {
    width: 1px;
    background: rgba(0, 0, 0, 0.1);
    margin: 4px 0;
  }

  &__menu-trigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 8px;
    background: transparent;
    border: none;
    cursor: pointer;
    border-radius: 0 4px 4px 0;
    color: var(--fill-color-text-secondary);

    &:hover {
      background: var(--fill-color-control-default);
      filter: brightness(0.96);
    }

    &:active, &--open {
        background: var(--fill-color-control-alt-secondary);
    }
  }

  &__dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    min-width: 120px;
    margin-top: 4px;
    background: var(--background-fill-color-layer-alt);
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    padding: 4px;
  }

  &__item {
    padding: 6px 12px;
    cursor: pointer;
    border-radius: 3px;
    font-size: 14px;
    color: var(--fill-color-text-primary);
    transition: background 0.1s;

    &:hover {
      background: var(--fill-color-control-alt-secondary);
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
