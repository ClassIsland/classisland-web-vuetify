<template>
  <RouterLink
    v-if="to"
    custom
    :to="to"
    :replace="replace"
    v-slot="{ href: resolvedHref, navigate, isActive, isExactActive }"
  >
    <a
      class="fluent-button"
      :class="[
        `fluent-button--${variant}`,
        {
          'fluent-button--disabled': disabled,
          'fluent-button--block': block,
          'router-link-active': isActive,
          'router-link-exact-active': isExactActive
        }
      ]"
      :href="resolvedHref"
      :aria-current="isExactActive ? 'page' : undefined"
      v-bind="$attrs"
      @click="disabled ? $event.preventDefault() : navigate($event)"
    >
      <span v-if="$slots.prepend" class="fluent-button__icon fluent-button__icon--prepend">
        <slot name="prepend"></slot>
      </span>
      <span class="fluent-button__text">
        <slot></slot>
      </span>
      <span v-if="$slots.append" class="fluent-button__icon fluent-button__icon--append">
        <slot name="append"></slot>
      </span>
    </a>
  </RouterLink>

  <a
    v-else-if="href"
    class="fluent-button"
    :class="[
      `fluent-button--${variant}`,
      { 'fluent-button--disabled': disabled, 'fluent-button--block': block }
    ]"
    :href="href"
    v-bind="$attrs"
  >
    <span v-if="$slots.prepend" class="fluent-button__icon fluent-button__icon--prepend">
      <slot name="prepend"></slot>
    </span>
    <span class="fluent-button__text">
      <slot></slot>
    </span>
    <span v-if="$slots.append" class="fluent-button__icon fluent-button__icon--append">
      <slot name="append"></slot>
    </span>
  </a>

  <button
    v-else
    class="fluent-button"
    :class="[
      `fluent-button--${variant}`,
      { 'fluent-button--disabled': disabled, 'fluent-button--block': block }
    ]"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <span v-if="$slots.prepend" class="fluent-button__icon fluent-button__icon--prepend">
      <slot name="prepend"></slot>
    </span>
    <span class="fluent-button__text">
      <slot></slot>
    </span>
    <span v-if="$slots.append" class="fluent-button__icon fluent-button__icon--append">
      <slot name="append"></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { PropType } from 'vue';
import type { RouteLocationRaw } from 'vue-router';

const props = defineProps({
  variant: {
    type: String,
    default: 'standard', // 'standard', 'primary', 'text', 'hyperlink'
    validator: (value: string) => ['standard', 'primary', 'text', 'hyperlink'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
  href: {
    type: String,
    default: undefined,
  },
  to: {
    type: [String, Object] as PropType<RouteLocationRaw>,
    default: undefined,
  },
  replace: {
    type: Boolean,
    default: false,
  }
});
</script>

<style scoped lang="scss">
.fluent-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 5px 12px 7px;
  min-height: 32px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.1s;
  font-family: var(--font-family-base);
  font-size: 14px;
  line-height: 20px;
  box-sizing: border-box;
  user-select: none;
  text-decoration: none; /* For a tags */
  gap: 8px;

  &--block {
    display: flex;
    width: 100%;
  }

  &__text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__icon {
    display: flex;
    align-items: center;
  }

  /* Primary Variant */
  &--primary {
    background: var(--fill-color-accent-default);
    color: var(--fill-color-text-on-accent-primary);

    &:hover:not(.fluent-button--disabled) {
      background: var(--fill-color-accent-secondary);
    }

    &:active:not(.fluent-button--disabled) {
      background: var(--fill-color-accent-tertiary);
      color: var(--fill-color-text-on-accent-primary);
    }
  }

  /* Standard Variant */
  &--standard {
    background: var(--fill-color-control-default);
    color: var(--fill-color-text-primary);
    border-color: var(--stroke-color-control-stroke-default);
    border-bottom-color: var(--stroke-color-control-strong-stroke-default);

    &:hover:not(.fluent-button--disabled) {
      background: var(--fill-color-control-secondary); 
    }

    &:active:not(.fluent-button--disabled) {
      background: var(--fill-color-control-tertiary);
      color: var(--fill-color-text-secondary);
    }
  }

  /* Text Variant (Subtle) */
  &--text {
    background: transparent;
    color: var(--fill-color-text-primary);
    border-color: transparent;

    &:hover:not(.fluent-button--disabled) {
      background: var(--fill-color-subtle-secondary);
    }

    &:active:not(.fluent-button--disabled) {
      background: var(--fill-color-subtle-tertiary);
      color: var(--fill-color-text-secondary);
    }
  }

  /* Hyperlink Variant */
  &--hyperlink {
    background: transparent;
    color: var(--fill-color-accent-text-primary);
    border-color: transparent;
    padding: 5px 0 7px; /* Often hyperlinks have less padding or no padding, but keeping consistent height */
    /* HyperlinkButton in FDS usually has no background on hover/active, just text color change or underline. 
       But screenshot 175001_2563 is just text.
       However, FDS HyperlinkButton often behaves like a link. 
       Let's keep it simple: text color is accent.
    */
    padding: 5px 12px 7px; /* Keep padding for click target */

    &:hover:not(.fluent-button--disabled) {
      background: var(--fill-color-subtle-secondary);
      color: var(--fill-color-accent-text-secondary);
    }

    &:active:not(.fluent-button--disabled) {
      background: var(--fill-color-subtle-tertiary);
      color: var(--fill-color-accent-text-tertiary);
    }
  }

  /* Disabled State */
  &--disabled {
    cursor: not-allowed;
    opacity: 0.6;
    background: var(--fill-color-control-alt-secondary);
    color: var(--fill-color-text-secondary);
    border-color: transparent;
    pointer-events: none; /* Prevent clicks on disabled links */
  }
}
</style>
