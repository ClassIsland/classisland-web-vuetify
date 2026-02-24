<template>
  <label class="fluent-toggle" :class="{ 'fluent-toggle--disabled': disabled, 'fluent-toggle--checked': modelValue }">
    <input
      type="checkbox"
      class="fluent-toggle__input"
      :checked="modelValue"
      :disabled="disabled"
      @change="updateValue"
    />
    <div class="fluent-toggle__track">
      <div class="fluent-toggle__thumb"></div>
    </div>
    <span v-if="label" class="fluent-toggle__label">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.checked);
};
</script>

<style scoped lang="scss">
.fluent-toggle {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  font-family: var(--font-family-base);
  font-size: 14px;
  line-height: 20px;
  color: var(--fill-color-text-primary);
  gap: 12px;

  &--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  &__track {
    position: relative;
    width: 40px;
    height: 20px;
    border-radius: 999px;
    background: var(--fill-color-control-alt-secondary);
    border: 1px solid var(--stroke-color-control-strong-stroke-default);
    transition: all 0.1s ease;
    box-sizing: border-box;
  }

  &__thumb {
    position: absolute;
    top: 3px; /* (20 - 12) / 2 - border(1) = 3px? No. Height 20, thumb 12. Top = (20-12-2)/2 + 1? */
    /* Figma: base4 padding 3px 23px 3px 3px. Thumb 12px. Base height 20px (implied) */
    /* Let's align it carefully */
    top: 50%;
    transform: translateY(-50%);
    left: 3px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--fill-color-text-secondary);
    transition: all 0.1s ease;
  }

  /* Hover state */
  &:hover:not(.fluent-toggle--disabled) .fluent-toggle__track {
    background: var(--fill-color-control-alt-secondary);
  }

  /* Checked state */
  &--checked {
    .fluent-toggle__track {
      background: var(--fill-color-accent-default);
      border-color: var(--fill-color-accent-default);
    }

    .fluent-toggle__thumb {
      background: #ffffff;
      left: calc(100% - 15px); /* 40 - 12 - 3 = 25? No. */
      /* Left was 3px. Right should be 3px. Width 40. 40 - 3 - 12 = 25px. */
    }

    &:hover:not(.fluent-toggle--disabled) {
      .fluent-toggle__track {
        background: var(--fill-color-accent-secondary);
        border-color: var(--fill-color-accent-secondary);
      }
    }

    &:active:not(.fluent-toggle--disabled) {
      .fluent-toggle__track {
        background: var(--fill-color-accent-tertiary);
        border-color: var(--fill-color-accent-tertiary);
      }
    }
  }
}
</style>
