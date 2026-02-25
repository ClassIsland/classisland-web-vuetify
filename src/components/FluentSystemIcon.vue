<template>
  <span
    class="fluent-system-icon"
    :style="iconStyle"
    :aria-hidden="decorative ? 'true' : undefined"
    :role="decorative ? undefined : 'img'"
    :title="title"
    v-html="svgMarkup"
  />
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import {
  FLUENT_ICON_FALLBACK_NAME,
  FLUENT_SYSTEM_ICONS
} from '@/constants/fluent-system-icons';
import type { FluentIconName } from '@/types/fluent-icon';

const props = withDefaults(
  defineProps<{
    name: string;
    size?: number | string;
    filled?: boolean;
    title?: string;
    decorative?: boolean;
  }>(),
  {
    size: 16,
    filled: false,
    title: '',
    decorative: true
  }
);

const normalizedSize = computed(() => {
  if (typeof props.size === 'number') {
    return `${props.size}px`;
  }
  return props.size;
});

const iconStyle = computed(() => ({
  width: normalizedSize.value,
  height: normalizedSize.value
}));

const resolvedIconName = computed<FluentIconName>(() => {
  if (props.name in FLUENT_SYSTEM_ICONS) {
    return props.name as FluentIconName;
  }
  return FLUENT_ICON_FALLBACK_NAME;
});

const svgMarkup = computed(() => {
  const icon = FLUENT_SYSTEM_ICONS[resolvedIconName.value];
  if (props.filled && icon.filled) {
    return icon.filled;
  }
  return icon.regular;
});

watchEffect(() => {
  if (!import.meta.env.DEV) {
    return;
  }
  if (props.name in FLUENT_SYSTEM_ICONS) {
    return;
  }
  console.warn(`[FluentSystemIcon] Unknown icon name "${props.name}". Fallback is "${FLUENT_ICON_FALLBACK_NAME}".`);
});
</script>

<style scoped lang="scss">
.fluent-system-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  color: currentColor;
  flex-shrink: 0;

  :deep(svg) {
    width: 100%;
    height: 100%;
    display: block;
  }

  :deep(path) {
    fill: currentColor;
  }

  :deep(circle),
  :deep(rect),
  :deep(polygon),
  :deep(ellipse) {
    fill: currentColor;
  }
}
</style>
