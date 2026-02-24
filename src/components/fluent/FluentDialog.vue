<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="modelValue" class="fluent-dialog-overlay" @click="closeOnOverlay">
        <div class="fluent-dialog" @click.stop>
          <div class="fluent-dialog__content">
            <h2 class="fluent-dialog__title">{{ title }}</h2>
            <div class="fluent-dialog__body">
              <slot></slot>
            </div>
          </div>
          <div class="fluent-dialog__footer">
            <slot name="footer">
              <div class="fluent-dialog__actions">
                <slot name="actions"></slot>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Dialog',
  },
  closeOnOverlayClick: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const close = () => {
  emit('update:modelValue', false);
};

const closeOnOverlay = () => {
  if (props.closeOnOverlayClick) {
    close();
  }
};
</script>

<style scoped lang="scss">
.fluent-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--background-fill-color-smoke-default);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.fluent-dialog {
  background: var(--background-fill-color-solid-background-base);
  border-radius: 8px;
  box-shadow: var(--shadow-dialog);
  width: 100%;
  max-width: 500px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--stroke-color-surface-stroke-default);

  &__content {
    background: var(--background-fill-color-layer-alt);
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__title {
    font-family: var(--font-family-base);
    font-size: 20px;
    font-weight: 600;
    color: var(--fill-color-text-primary);
    margin: 0;
  }

  &__body {
    font-family: var(--font-family-base);
    font-size: 14px;
    line-height: 20px;
    color: var(--fill-color-text-primary);
  }

  &__footer {
    padding: 24px;
    background: var(--background-fill-color-solid-background-base);
    border-top: 1px solid var(--stroke-color-surface-stroke-default);
    display: flex;
    justify-content: flex-end;
  }

  &__actions {
    display: flex;
    gap: 8px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
