<template>
  <div class="fluent-combobox" ref="container">
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
  </div>
  <teleport :to="teleportTarget">
    <transition name="fluent-flyout">
      <div
        v-if="isOpen"
        ref="dropdown"
        class="fluent-combobox__dropdown"
        :class="`fluent-combobox__dropdown--${dropdownPlacement}`"
        :style="dropdownStyle"
      >
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
  </teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch, type CSSProperties, defineProps, defineEmits } from 'vue';

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
const dropdown = ref<HTMLElement | null>(null);
const dropdownStyle = ref<CSSProperties>({});
const dropdownPlacement = ref<'top' | 'bottom'>('bottom');
const teleportTarget = ref<string | HTMLElement>('body');

const VIEWPORT_PADDING = 8;
const DROPDOWN_GAP = 4;
const MAX_DROPDOWN_HEIGHT = 200;

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
  const target = e.target as Node;
  if (!target) return;

  if (container.value?.contains(target)) return;
  if (dropdown.value?.contains(target)) return;

  isOpen.value = false;
};

const updateDropdownPosition = () => {
  if (!isOpen.value || !container.value) return;

  const trigger = container.value.querySelector('.fluent-combobox__trigger') as HTMLElement | null;
  const anchor = trigger ?? container.value;
  const rect = anchor.getBoundingClientRect();
  const spaceBelow = window.innerHeight - rect.bottom - VIEWPORT_PADDING;
  const spaceAbove = rect.top - VIEWPORT_PADDING;

  const dropdownHeight = dropdown.value
    ? Math.min(dropdown.value.scrollHeight, MAX_DROPDOWN_HEIGHT)
    : MAX_DROPDOWN_HEIGHT;
  const openOnTop = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;
  const maxHeight = Math.max(
    80,
    Math.min(MAX_DROPDOWN_HEIGHT, (openOnTop ? spaceAbove : spaceBelow) - DROPDOWN_GAP),
  );
  const renderedHeight = Math.min(dropdownHeight, maxHeight);

  const top = openOnTop
    ? rect.top - DROPDOWN_GAP - renderedHeight
    : rect.bottom + DROPDOWN_GAP;
  const left = Math.max(
    VIEWPORT_PADDING,
    Math.min(rect.left, window.innerWidth - rect.width - VIEWPORT_PADDING),
  );

  dropdownPlacement.value = openOnTop ? 'top' : 'bottom';
  dropdownStyle.value = {
    top: `${Math.max(VIEWPORT_PADDING, top)}px`,
    left: `${left}px`,
    width: `${rect.width}px`,
    maxHeight: `${maxHeight}px`,
  };
};

const onViewportChange = () => {
  if (isOpen.value) {
    updateDropdownPosition();
  }
};

const resolveTeleportTarget = () => {
  if (!container.value) return;

  const themeRoot = container.value.closest('.v-theme--dark, .v-theme--light') as HTMLElement | null;
  const appRoot = container.value.closest('.v-application') as HTMLElement | null;
  teleportTarget.value = themeRoot ?? appRoot ?? document.body;
};

onMounted(() => {
  resolveTeleportTarget();
  window.addEventListener('click', close);
  window.addEventListener('resize', onViewportChange);
  window.addEventListener('scroll', onViewportChange, true);
});

onUnmounted(() => {
  window.removeEventListener('click', close);
  window.removeEventListener('resize', onViewportChange);
  window.removeEventListener('scroll', onViewportChange, true);
});

watch(isOpen, async (open) => {
  if (!open) return;
  await nextTick();
  updateDropdownPosition();
  requestAnimationFrame(updateDropdownPosition);
});
</script>

<style scoped lang="scss">
.fluent-combobox {
  position: relative;
  display: inline-block;
  width: 200px; /* Default width */
  font-family: var(--font-family-base);
  font-size: 14px;
  line-height: 20px;

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
    position: fixed;
    background: var(--background-fill-color-layer-alt);
    border: 1px solid var(--stroke-color-surface-stroke-flyout);
    border-radius: 4px;
    box-shadow: var(--shadow-flyout);
    z-index: 1250;
    overflow-y: auto;
    padding: 4px;
    will-change: transform, opacity;

    &--bottom {
      transform-origin: top left;
    }

    &--top {
      transform-origin: bottom left;
    }
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
      //font-weight: 600;
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
}

.fluent-flyout-enter-from.fluent-combobox__dropdown--bottom {
  transform: translateY(-6px) scale(0.96);
}

.fluent-flyout-enter-from.fluent-combobox__dropdown--top {
  transform: translateY(6px) scale(0.96);
}

.fluent-flyout-leave-active {
  transition:
    opacity 100ms linear,
    transform 160ms cubic-bezier(0.4, 0, 1, 1);
}

.fluent-flyout-leave-to {
  opacity: 0;
}

.fluent-flyout-leave-to.fluent-combobox__dropdown--bottom {
  transform: translateY(-2px) scale(0.98);
}

.fluent-flyout-leave-to.fluent-combobox__dropdown--top {
  transform: translateY(2px) scale(0.98);
}
</style>
