<template>
  <div class="fluent-slider" :class="{ 'fluent-slider--disabled': disabled }" ref="sliderRef" @mousedown="onMouseDown">
    <div class="fluent-slider__rail"></div>
    <div class="fluent-slider__track" :style="{ width: percentage + '%' }"></div>
    <div
      class="fluent-slider__thumb"
      :style="{ left: percentage + '%' }"
      @mousedown.stop="onThumbMouseDown"
    >
      <div class="fluent-slider__thumb-inner"></div>
      <div class="fluent-slider__tooltip" v-if="showTooltip">{{ modelValue }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue', 'change']);

const sliderRef = ref<HTMLElement | null>(null);
const isDragging = ref(false);
const showTooltip = ref(false);

const percentage = computed(() => {
  return ((props.modelValue - props.min) / (props.max - props.min)) * 100;
});

const updateValue = (clientX: number) => {
  if (!sliderRef.value || props.disabled) return;

  const rect = sliderRef.value.getBoundingClientRect();
  const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
  const percent = x / rect.width;
  
  let newValue = props.min + percent * (props.max - props.min);
  
  // Snap to step
  const stepCount = Math.round((newValue - props.min) / props.step);
  newValue = props.min + stepCount * props.step;

  // Clamp
  newValue = Math.max(props.min, Math.min(props.max, newValue));

  if (newValue !== props.modelValue) {
    emit('update:modelValue', newValue);
  }
};

const onMouseDown = (e: MouseEvent) => {
  if (props.disabled) return;
  updateValue(e.clientX);
  isDragging.value = true;
  showTooltip.value = true;
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
};

const onThumbMouseDown = (e: MouseEvent) => {
  if (props.disabled) return;
  isDragging.value = true;
  showTooltip.value = true;
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
};

const onMouseMove = (e: MouseEvent) => {
  if (isDragging.value) {
    updateValue(e.clientX);
  }
};

const onMouseUp = () => {
  if (isDragging.value) {
    emit('change', props.modelValue);
  }
  isDragging.value = false;
  showTooltip.value = false;
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
};

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
});
</script>

<style scoped lang="scss">
.fluent-slider {
  position: relative;
  width: 100%;
  height: 32px; /* Touch target height */
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;

  &--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &__rail {
    position: absolute;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--fill-color-control-strong-default);
    border-radius: 2px;
  }

  &__track {
    position: absolute;
    left: 0;
    height: 4px;
    background: var(--fill-color-accent-default);
    border-radius: 2px;
  }

  &__thumb {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--fill-color-control-solid-default);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateX(-50%);
    top: 50%;
    margin-top: -10px;
    transition: transform 0.1s, background-color 0.1s;

    &:hover {
      transform: translateX(-50%) scale(1.1);
    }

    &:active {
      transform: translateX(-50%) scale(0.95);
    }
  }

  &__thumb-inner {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--fill-color-accent-default);
  }

  &__tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 4px 8px;
    background: #333;
    color: #fff;
    border-radius: 4px;
    font-size: 12px;
    pointer-events: none;
    margin-bottom: 8px;
    white-space: nowrap;
  }
}
</style>
