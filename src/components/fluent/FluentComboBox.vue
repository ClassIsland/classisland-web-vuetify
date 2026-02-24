<template>
  <div class="fluent-combobox" :class="{ 'fluent-combobox--open': isOpen }" ref="container">
    <div
      class="fluent-combobox__trigger"
      :class="{ 'fluent-combobox__trigger--open': isOpen, 'fluent-combobox__trigger--disabled': disabled }"
      @click="toggle"
    >
      <span class="fluent-combobox__text" :class="{ 'fluent-combobox__text--placeholder': !selectedLabel }">
        {{ selectedLabel || placeholder }}
      </span>
      <span class="fluent-combobox__icon">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </div>
    <transition name="fluent-flyout">
      <div v-if="isOpen" class="fluent-combobox__dropdown">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="fluent-combobox__item"
          :class="{ 'fluent-combobox__item--selected': isSelected(item) }"
          @click="select(item)"
        >
          {{ getItemLabel(item) }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number, Object],
    default: null,
  },
  items: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: 'Select an option',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  itemText: {
    type: String,
    default: 'text',
  },
  itemValue: {
    type: String,
    default: 'value',
  },
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const container = ref<HTMLElement | null>(null);

const getItemLabel = (item: any) => {
  if (typeof item === 'object' && item !== null) {
    return item[props.itemText];
  }
  return item;
};

const getItemValue = (item: any) => {
  if (typeof item === 'object' && item !== null) {
    return item[props.itemValue];
  }
  return item;
};

const selectedLabel = computed(() => {
  if (props.modelValue === null || props.modelValue === undefined) return '';
  const selectedItem = props.items.find((item) => getItemValue(item) === props.modelValue);
  return selectedItem ? getItemLabel(selectedItem) : props.modelValue;
});

const isSelected = (item: any) => {
  return getItemValue(item) === props.modelValue;
};

const toggle = () => {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
};

const select = (item: any) => {
  emit('update:modelValue', getItemValue(item));
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
.fluent-combobox {
  position: relative;
  z-index: 0;
  display: inline-block;
  width: 200px; /* Default width */
  font-family: var(--font-family-base);
  font-size: 14px;
  line-height: 20px;

  &--open {
    z-index: 1200;
  }

  &__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 11px;
    background: var(--fill-color-control-default);
    border: 1px solid transparent; /* Mimic standard border */
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.1s;
    height: 32px;
    box-sizing: border-box;

    &:hover {
      background: var(--fill-color-control-default);
      filter: brightness(0.96);
    }

    &--open {
      background: var(--fill-color-control-alt-secondary);
    }

    &--disabled {
      cursor: not-allowed;
      opacity: 0.6;
      background: var(--fill-color-control-alt-secondary);
    }
  }

  &__text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--fill-color-text-primary);

    &--placeholder {
      color: var(--fill-color-text-secondary);
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    margin-left: 8px;
    color: var(--fill-color-text-secondary);
  }

  &__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 4px;
    background: var(--background-fill-color-layer-alt);
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1;
    max-height: 200px;
    overflow-y: auto;
    padding: 4px;
    transform-origin: top left;
    will-change: transform, opacity;
  }

  &__item {
    padding: 6px 12px;
    cursor: pointer;
    border-radius: 3px;
    color: var(--fill-color-text-primary);
    transition: background 0.1s;

    &:hover {
      background: var(--fill-color-control-alt-secondary);
    }

    &--selected {
      background: var(--fill-color-control-alt-secondary);
      font-weight: 600;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        left: 2px;
        top: 50%;
        transform: translateY(-50%);
        height: 16px;
        width: 3px;
        background: var(--fill-color-accent-default);
        border-radius: 2px;
      }
    }
  }
}

.fluent-flyout-enter-active {
  transition:
    opacity 140ms linear,
    transform 240ms cubic-bezier(0.16, 1, 0.3, 1);
}

.fluent-flyout-enter-from {
  opacity: 0;
  transform: translateY(-6px) scale(0.96);
}

.fluent-flyout-leave-active {
  transition:
    opacity 100ms linear,
    transform 160ms cubic-bezier(0.4, 0, 1, 1);
}

.fluent-flyout-leave-to {
  opacity: 0;
  transform: translateY(-2px) scale(0.98);
}
</style>
