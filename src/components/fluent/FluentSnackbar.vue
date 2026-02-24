<template>
  <teleport to="body">
    <transition name="slide-up">
      <div v-if="modelValue" class="fluent-snackbar">
        <div class="fluent-snackbar__content">
          <slot>{{ message }}</slot>
        </div>
        <div class="fluent-snackbar__action" v-if="$slots.action">
          <slot name="action"></slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    default: '',
  },
  timeout: {
    type: Number,
    default: 3000,
  },
});

const emit = defineEmits(['update:modelValue']);

watch(() => props.modelValue, (newVal) => {
  if (newVal && props.timeout > 0) {
    setTimeout(() => {
      emit('update:modelValue', false);
    }, props.timeout);
  }
});
</script>

<style scoped lang="scss">
.fluent-snackbar {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--fill-color-control-solid-default); /* Should be solid background, usually distinct */
  background-color: #323232; /* Fluent dark gray for snackbars usually */
  color: #ffffff;
  padding: 12px 16px;
  border-radius: 4px;
  box-shadow: var(--shadow-dialog);
  display: flex;
  align-items: center;
  gap: 16px;
  z-index: 3000;
  min-width: 300px;
  font-family: var(--font-family-base);
  font-size: 14px;

  &__content {
    flex-grow: 1;
  }

  &__action {
    flex-shrink: 0;
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translate(-50%, 20px);
  opacity: 0;
}
</style>
