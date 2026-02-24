<template>
  <div class="fluent-text-box" :class="{ 'fluent-text-box--disabled': disabled, 'fluent-text-box--readonly': readonly }">
    <input
      class="fluent-text-box__input"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      @input="updateValue"
    />
    <div v-if="appendIcon" class="fluent-text-box__append-icon" @click="onAppendIconClick">
      <span :class="['mdi', appendIcon]"></span>
    </div>
    <div class="fluent-text-box__border-line"></div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  appendIcon: {
    type: String,
    default: '',
  }
});

const emit = defineEmits(['update:modelValue', 'click:append']);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const onAppendIconClick = () => {
  if (!props.disabled) {
    emit('click:append');
  }
};
</script>

<style scoped lang="scss">
.fluent-text-box {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
  min-width: 160px;
  height: 32px;
  border-radius: 4px;
  background: var(--fill-color-control-default);
  border: 1px solid var(--stroke-color-control-stroke-default);
  border-bottom: 1px solid var(--stroke-color-control-strong-stroke-default);
  box-sizing: border-box;
  transition: background-color 0.1s;

  &:hover:not(&--disabled) {
    background-color: var(--fill-color-control-alt-secondary);
  }

  /* Focus Indicator (Bottom Line) */
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 50%;
    width: 0;
    height: 2px;
    background-color: var(--fill-color-accent-default);
    border-radius: 0 0 4px 4px;
    transition: width 0.2s cubic-bezier(0.1, 0.9, 0.2, 1), left 0.2s cubic-bezier(0.1, 0.9, 0.2, 1);
    z-index: 1;
  }

  &:focus-within {
    &::after {
      width: calc(100% + 2px); /* Account for borders */
      left: -1px;
    }
  }

  &__input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
    padding: 0 11px;
    font-family: var(--font-family-base);
    font-size: 14px;
    line-height: 20px;
    color: var(--fill-color-text-primary);
    
    &::placeholder {
      color: var(--fill-color-text-secondary);
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  &__append-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 8px;
    cursor: pointer;
    color: var(--fill-color-text-secondary);
    
    &:hover {
      color: var(--fill-color-text-primary);
    }
  }

  &--disabled {
    opacity: 0.6;
    background: var(--fill-color-control-alt-secondary);
    pointer-events: none;
    border-color: transparent;
  }

  &--readonly {
    /* Readonly style: Keep border, change background, no focus line? 
       FDS usually keeps focus indication for readonly if it's selectable/copyable. 
       The user asked for border to be kept. 
       Let's ensure border stays visible.
    */
    background: var(--fill-color-control-alt-secondary);
    /* Border is already set by default class, no need to override to transparent */
  }
}
</style>
