<template>
  <div
    class="fluent-progress-ring"
    :class="{ 'fluent-progress-ring--indeterminate': isIndeterminate }"
    :style="ringStyle"
    role="progressbar"
    :aria-label="ariaLabel"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="isIndeterminate ? undefined : Math.round(normalizedValue)"
  >
    <svg class="fluent-progress-ring__svg" viewBox="0 0 100 100">
      <circle
        class="fluent-progress-ring__track"
        cx="50"
        cy="50"
        :r="radius"
        fill="none"
        :stroke-width="strokeWidth"
      />
      <circle
        class="fluent-progress-ring__indicator"
        cx="50"
        cy="50"
        :r="radius"
        fill="none"
        :stroke-width="strokeWidth"
        :style="indicatorStyle"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import type { CSSProperties } from 'vue';

const props = defineProps({
  size: {
    type: [Number, String],
    default: 32,
  },
  value: {
    type: Number,
    default: undefined,
  },
  ariaLabel: {
    type: String,
    default: 'Loading',
  },
});

const getNumber = (value: string | number | undefined, fallback: number) => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number.parseFloat(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
};

const normalizedSize = computed(() => {
  return Math.max(16, getNumber(props.size as string | number | undefined, 32));
});

const normalizedValue = computed(() => {
  if (props.value == null) return 0;
  return Math.min(100, Math.max(0, props.value));
});

const isIndeterminate = computed(() => props.value == null);
const strokeWidth = computed(() => Math.max(2.5, Math.round(normalizedSize.value / 12)));
const radius = computed(() => 50 - strokeWidth.value / 2);
const circumference = computed(() => 2 * Math.PI * radius.value);

const ringStyle = computed(() => {
  return {
    width: `${normalizedSize.value}px`,
    height: `${normalizedSize.value}px`,
    '--ring-circumference': `${circumference.value}`,
  } as CSSProperties;
});

const indicatorStyle = computed(() => {
  if (isIndeterminate.value) {
    return {
      strokeDasharray: `${circumference.value * 0.28} ${circumference.value}`,
      strokeDashoffset: `${circumference.value * 0.02}`,
    } as CSSProperties;
  }

  return {
    strokeDasharray: `${circumference.value} ${circumference.value}`,
    strokeDashoffset: `${circumference.value * (1 - normalizedValue.value / 100)}`,
  } as CSSProperties;
});
</script>

<style scoped lang="scss">
.fluent-progress-ring {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--fill-color-accent-default);

  &__svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }

  &__track {
    stroke: var(--fill-color-control-alt-secondary);
    stroke: color-mix(in srgb, var(--fill-color-text-primary) 14%, transparent);
  }

  &__indicator {
    stroke: currentColor;
    stroke-linecap: round;
    transition: stroke-dashoffset 220ms cubic-bezier(0.33, 0, 0.67, 1);
  }

  &--indeterminate {
    .fluent-progress-ring__svg {
      animation: fluent-progress-ring-rotate 1.8s linear infinite;
    }

    .fluent-progress-ring__indicator {
      animation: fluent-progress-ring-dash 1.25s cubic-bezier(0.33, 0, 0.67, 1) infinite;
    }
  }
}

@keyframes fluent-progress-ring-rotate {
  from {
    transform: rotate(-90deg);
  }
  to {
    transform: rotate(270deg);
  }
}

@keyframes fluent-progress-ring-dash {
  0% {
    stroke-dasharray: 1 var(--ring-circumference);
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: calc(var(--ring-circumference) * 0.42) var(--ring-circumference);
    stroke-dashoffset: calc(var(--ring-circumference) * -0.16);
  }
  100% {
    stroke-dasharray: calc(var(--ring-circumference) * 0.42) var(--ring-circumference);
    stroke-dashoffset: calc(var(--ring-circumference) * -0.58);
  }
}

@media (prefers-reduced-motion: reduce) {
  .fluent-progress-ring--indeterminate {
    .fluent-progress-ring__svg,
    .fluent-progress-ring__indicator {
      animation-duration: 2.8s;
    }
  }
}
</style>
