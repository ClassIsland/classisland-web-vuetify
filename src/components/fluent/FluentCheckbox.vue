<template>
  <label class="fluent-checkbox" :class="{ 'fluent-checkbox--disabled': disabled }">
    <input
      type="checkbox"
      class="fluent-checkbox__input"
      :checked="modelValue"
      :disabled="disabled"
      @change="updateValue"
    />
    <div class="fluent-checkbox__box">
      <svg
        v-if="modelValue"
        class="fluent-checkbox__checkmark"
        viewBox="0 0 12 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 5L4.5 8.5L11 1.5"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <span v-if="label" class="fluent-checkbox__label">{{ label }}</span>
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
.fluent-checkbox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  font-family: var(--font-family-base);
  font-size: 14px;
  line-height: 20px;
  color: var(--fill-color-text-primary);
  gap: 8px;

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

  &__box {
    width: 18px;
    height: 18px;
    border-radius: 3px;
    border: 1px solid var(--stroke-color-control-strong-stroke-default);
    background: var(--fill-color-control-alt-secondary); /* Default background */
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.1s;
    box-sizing: border-box;
  }

  /* Hover state */
  &:hover:not(.fluent-checkbox--disabled) .fluent-checkbox__box {
    border-color: var(--fill-color-text-primary); /* Darker border on hover */
    background: var(--fill-color-control-alt-secondary);
  }

  /* Active/Checked state */
  &__input:checked + &__box {
    background: var(--fill-color-accent-default);
    border-color: var(--fill-color-accent-default);
  }

  &__input:checked:hover + &__box {
    background: var(--fill-color-accent-secondary);
    border-color: var(--fill-color-accent-secondary);
  }

  &__input:checked:active + &__box {
    background: var(--fill-color-accent-tertiary);
    border-color: var(--fill-color-accent-tertiary);
  }

  &__checkmark {
    width: 12px;
    height: 10px;
  }
}
</style>
