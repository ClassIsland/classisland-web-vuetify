<template>
  <nav class="fluent-selector-bar">
    <template v-for="item in items" :key="item.title">
      <RouterLink
        v-if="item.to"
        custom
        :to="item.to"
        v-slot="{ href, navigate, isActive, isExactActive }"
      >
        <a
          class="fluent-selector-bar__item"
          :class="{
            'router-link-active': isActive,
            'router-link-exact-active': isExactActive
          }"
          :href="href"
          :target="item.target"
          :rel="item.target === '_blank' ? 'noopener noreferrer' : undefined"
          :aria-current="isExactActive ? 'page' : undefined"
          @click="navigate($event)"
        >
          <div class="fluent-selector-bar__content">
            <span class="fluent-selector-bar__text">{{ item.title }}</span>
            <span v-if="item.icon && showIcon" :class="['mdi', item.icon, 'fluent-selector-bar__icon']"></span>
          </div>
          <div class="fluent-selector-bar__pill"></div>
        </a>
      </RouterLink>
      <a
        v-else
        class="fluent-selector-bar__item"
        :href="item.href"
        :target="item.target"
        :rel="item.target === '_blank' ? 'noopener noreferrer' : undefined"
      >
        <div class="fluent-selector-bar__content">
          <span class="fluent-selector-bar__text">{{ item.title }}</span>
          <span v-if="item.icon && showIcon" :class="['mdi', item.icon, 'fluent-selector-bar__icon']"></span>
        </div>
        <div class="fluent-selector-bar__pill"></div>
      </a>
    </template>
  </nav>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  items: {
    type: Array as () => any[],
    default: () => [],
  },
  showIcon: {
    type: Boolean,
    default: false,
  }
});
</script>

<style scoped lang="scss">
.fluent-selector-bar {
  display: flex;

  &__item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 12px 7px;
    height: 40px;
    text-decoration: none;
    color: var(--fill-color-text-primary);
    font-family: var(--font-family-base);
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.1s;
    box-sizing: border-box;

    &:hover {
      background: var(--fill-color-subtle-secondary);
    }
    &:active{
      background: var(--fill-color-subtle-tertiary);

    }
  }

  &__content {
      display: flex;
      align-items: center;
      gap: 8px;
  }

  &__text {
      white-space: nowrap;
  }

  &__pill {
    position: absolute;
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 16px;
    height: 3px;
    background-color: var(--fill-color-accent-default);
    border-radius: 99px;
    transition: transform 0.2s ease;
    /* Opacity transition for smoother appearance */
    opacity: 0;
  }

  /* Active states */
  .router-link-active &__pill,
  .router-link-exact-active &__pill {
    transform: translateX(-50%) scaleX(1);
    opacity: 1;
  }

  /* Handle external links active state if manually managed or just rely on hover for now?
     External links usually don't have 'active' state in the same way.
     We can assume only internal links get the pill.
  */
}
</style>
