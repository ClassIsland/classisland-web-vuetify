<template>
  <div class="fluent-flip-view">
    <div class="fluent-flip-view__container" v-if="items.length > 0">
      <transition name="fade" mode="out-in">
        <div :key="currentIndex" class="fluent-flip-view__item">
          <img :src="items[currentIndex]" class="fluent-flip-view__image" />
        </div>
      </transition>

      <button
        class="fluent-flip-view__nav fluent-flip-view__nav--prev"
        @click="prev"
        :disabled="currentIndex === 0 && !loop"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 3L5 8L10 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <button
        class="fluent-flip-view__nav fluent-flip-view__nav--next"
        @click="next"
        :disabled="currentIndex === items.length - 1 && !loop"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <div class="fluent-flip-view__indicators">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="fluent-flip-view__indicator"
          :class="{ 'fluent-flip-view__indicator--active': index === currentIndex }"
          @click="currentIndex = index"
        ></div>
      </div>
    </div>
    <div v-else class="fluent-flip-view__empty">
      No items
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

const props = defineProps({
  items: {
    type: Array as () => string[],
    default: () => [],
  },
  loop: {
    type: Boolean,
    default: true,
  },
});

const currentIndex = ref(0);

const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else if (props.loop) {
    currentIndex.value = props.items.length - 1;
  }
};

const next = () => {
  if (currentIndex.value < props.items.length - 1) {
    currentIndex.value++;
  } else if (props.loop) {
    currentIndex.value = 0;
  }
};
</script>

<style scoped lang="scss">
.fluent-flip-view {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 300px;
  background: var(--background-fill-color-solid-background-base);
  border-radius: 8px;
  overflow: hidden;

  &__container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__item {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 4px;
  }

  &__nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    border-radius: 4px;
    background: var(--fill-color-control-default); /* Was hardcoded rgba */
    backdrop-filter: blur(10px);
    border: 1px solid var(--stroke-color-control-stroke-default);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--fill-color-text-primary); /* Was #333 */
    transition: all 0.2s;
    z-index: 10;

    &:hover:not(:disabled) {
      background: var(--fill-color-control-secondary); /* Darker/lighter depending on theme */
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    &:active:not(:disabled) {
      background: var(--fill-color-control-tertiary);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &--prev {
      left: 10px;
    }

    &--next {
      right: 10px;
    }
  }

  &__indicators {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 10;
  }

  &__indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: background 0.2s;

    &--active {
      background: var(--fill-color-accent-default);
    }
  }

  &__empty {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: #666;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
