<template>
  <nav class="fluent-side-nav">
    <template v-for="item in items" :key="item.title">
      <RouterLink
        v-if="item.to"
        custom
        :to="item.to"
        v-slot="{ href, navigate }"
      >
        <a
          class="fluent-side-nav__item"
          :class="{ 'fluent-side-nav__item--active': isSelected(item) }"
          :href="href"
          :target="item.target"
          :rel="item.target === '_blank' ? 'noopener noreferrer' : undefined"
          :aria-current="isSelected(item) ? 'page' : undefined"
          @click="onRouterItemClick($event, item, navigate)"
        >
          <div class="fluent-side-nav__item-base">
            <span v-if="item.icon" :class="['mdi', item.icon, 'fluent-side-nav__icon']"></span>
            <span class="fluent-side-nav__text">{{ item.title }}</span>
          </div>
          <div class="fluent-side-nav__selector" v-if="isSelected(item)"></div>
        </a>
      </RouterLink>
      <a
        v-else
        class="fluent-side-nav__item"
        :class="{ 'fluent-side-nav__item--active': isSelected(item) }"
        :href="item.href"
        :target="item.target"
        :rel="item.target === '_blank' ? 'noopener noreferrer' : undefined"
        @click="onAnchorItemClick(item)"
      >
        <div class="fluent-side-nav__item-base">
          <span v-if="item.icon" :class="['mdi', item.icon, 'fluent-side-nav__icon']"></span>
          <span class="fluent-side-nav__text">{{ item.title }}</span>
        </div>
        <div class="fluent-side-nav__selector" v-if="isSelected(item)"></div>
      </a>
    </template>
  </nav>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useRoute, useRouter, type RouteLocationRaw } from 'vue-router';

const props = defineProps({
  items: {
    type: Array as () => any[],
    default: () => [],
  },
});

const emit = defineEmits(['click']);
const route = useRoute();
const router = useRouter();

const resolvePath = (to: RouteLocationRaw) => {
  return router.resolve(to).path;
};

const isSelected = (item: any) => {
  if (item.to) {
    const targetPath = resolvePath(item.to);
    return route.path === targetPath || (targetPath !== '/' && route.path.startsWith(targetPath));
  }
  return false;
};

const handleClick = (item: any) => {
  emit('click', item);
};

const onRouterItemClick = (
  event: MouseEvent,
  item: any,
  navigate: (event?: MouseEvent) => void | Promise<void>
) => {
  const navigationResult = navigate(event);
  Promise.resolve(navigationResult).finally(() => {
    handleClick(item);
  });
};

const onAnchorItemClick = (item: any) => {
  handleClick(item);
};
</script>

<style scoped lang="scss">
.fluent-side-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px;

  &__item {
    position: relative;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--fill-color-text-primary);
    border-radius: 4px;
    cursor: pointer;
    min-height: 40px;
    box-sizing: border-box;
    transition: background-color 0.1s;

    &:hover {
      background-color: var(--fill-color-subtle-secondary, rgba(0, 0, 0, 0.04));
    }

    &:active {
      background-color: var(--fill-color-subtle-tertiary, rgba(0, 0, 0, 0.08));
    }
    
    /* Active state styling */
    &--active {
      background-color: var(--fill-color-subtle-secondary, rgba(0, 0, 0, 0.04));
      
      .fluent-side-nav__icon {
        // Active icon style if needed, usually same or accent
      }
    }
  }

  &__item-base {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 12px; // Adjusted for alignment
    gap: 12px;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    font-size: 16px;
    color: var(--fill-color-text-primary);
  }

  &__text {
    font-family: var(--font-family-base);
    font-size: 14px;
    line-height: 20px;
    color: var(--fill-color-text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__selector {
    position: absolute;
    left: 3px;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 16px;
    background-color: var(--fill-color-accent-default);
    border-radius: 99px;
  }
}
</style>
