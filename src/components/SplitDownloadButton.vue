<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  downloadInfos: {
    type: Object,
    required: true
  },
  downloadRouteRoot: String,
  selectedDownloadInfo: String,
  title: String,
  isSelected: Boolean,
  variant: {
    type: String,
    default: 'standard', // 'standard', 'primary'
  }
});

const isOpen = ref(false);
const container = ref<HTMLElement | null>(null);

const currentInfo = computed(() => {
  return props.downloadInfos[props.selectedDownloadInfo || ''];
});

const mainTo = computed(() => {
  if (!props.downloadRouteRoot || !props.selectedDownloadInfo) return undefined;
  return props.downloadRouteRoot + props.selectedDownloadInfo;
});

const menuItems = computed(() => {
  return Object.keys(props.downloadInfos).map(key => ({
    key,
    ...props.downloadInfos[key],
    to: props.downloadRouteRoot ? props.downloadRouteRoot + key : undefined
  }));
});

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const onMenuNavigate = (event: MouseEvent, navigate: (event?: MouseEvent) => void) => {
  navigate(event);
  isOpen.value = false;
};

const onMenuItemClick = () => {
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

<template>
  <div
    class="fluent-split-button"
    :class="[
      `fluent-split-button--${variant}`,
      {
        'fluent-split-button--primary': isSelected,
        'fluent-split-button--open': isOpen
      }
    ]"
    ref="container"
  >
    <RouterLink
      v-if="mainTo"
      custom
      :to="mainTo"
      v-slot="{ href, navigate }"
    >
      <a class="fluent-split-button__main" :href="href" @click="navigate($event)">
        <div class="fluent-split-button__content">
          <span class="fluent-split-button__title">{{ title }}</span>
          <span class="fluent-split-button__subtitle" v-if="currentInfo">
            {{ currentInfo.title }}
          </span>
        </div>
      </a>
    </RouterLink>
    <button v-else type="button" class="fluent-split-button__main">
      <div class="fluent-split-button__content">
        <span class="fluent-split-button__title">{{ title }}</span>
        <span class="fluent-split-button__subtitle" v-if="currentInfo">
          {{ currentInfo.title }}
        </span>
      </div>
    </button>
    <div class="fluent-split-button__divider"></div>
    <button
      type="button"
      class="fluent-split-button__menu-trigger"
      :class="{ 'fluent-split-button__menu-trigger--open': isOpen }"
      @click="toggle"
    >
      <span class="fluent-split-button__icon">
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </button>
    <transition name="fluent-flyout">
      <div v-if="isOpen" class="fluent-split-button__dropdown">
        <template v-for="item in menuItems" :key="item.key">
          <RouterLink v-if="item.to" custom :to="item.to" v-slot="{ href, navigate }">
            <a
              class="fluent-split-button__item"
              :href="href"
              @click="onMenuNavigate($event, navigate)"
            >
              <span>{{ item.title }}</span>
            </a>
          </RouterLink>
          <div v-else class="fluent-split-button__item" @click="onMenuItemClick">
            <span>{{ item.title }}</span>
          </div>
        </template>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.fluent-split-button {
  position: relative;
  z-index: 0;
  display: inline-flex;
  border-radius: 4px;
  background: var(--fill-color-control-default);
  border: 1px solid var(--stroke-color-accent-border);
  border-bottom: 1px solid var(--stroke-color-control-strong-stroke-default);
  height: 48px;
  box-sizing: border-box;
  font-family: var(--font-family-base);

  &--open {
    z-index: 1300;
  }

  &--primary {
    //background: var(--fill-color-accent-default);
    color: var(--fill-color-text-on-accent-primary);
    border-color: transparent;

    .fluent-split-button__main,
    .fluent-split-button__menu-trigger {
      background: var(--fill-color-accent-default);
      color: var(--fill-color-text-on-accent-primary);

      &:hover {
        background: var(--fill-color-accent-secondary);
      }

      &:active {
        background: var(--fill-color-accent-tertiary);
      }
    }

    .fluent-split-button__divider {
      background: var(--fill-color-text-on-accent-tertiary);
    }
  }

  &__main {
    display: inline-flex;
    align-items: center;
    padding: 5px 12px;
    background: transparent;
    border: none;
    cursor: pointer;
    color: inherit;
    border-radius: 4px 0 0 4px;
    text-align: center;
    text-decoration: none;

    &:hover {
      background: var(--fill-color-control-secondary);
    }

    &:active {
        background: var(--fill-color-control-tertiary);
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 1.2;
  }

  &__title {
    font-size: 14px;
    font-weight: 600;
  }

  &__subtitle {
    font-size: 11px;
    opacity: 0.8;
  }

  &__divider {
    width: 1px;
    background: var(--stroke-color-control-stroke-default);
  }

  &__menu-trigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 8px;
    background: transparent;
    border: none;
    cursor: pointer;
    border-radius: 0 4px 4px 0;
    color: inherit;

    &:hover {
      background: var(--fill-color-control-secondary);
    }

    &:active, &--open {
        background: var(--fill-color-control-tertiary);
    }
  }

  &__dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    min-width: 160px;
    margin-top: 4px;
    background: var(--background-fill-color-layer-alt);
    border: 1px solid var(--stroke-color-control-stroke-default);
    border-radius: 4px;
    box-shadow: var(--shadow-flyout);
    z-index: 2;
    padding: 4px;
    transform-origin: top right;
    will-change: transform, opacity;
  }

  &__item {
    display: block;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 3px;
    font-size: 14px;
    color: var(--fill-color-text-primary);
    text-decoration: none;
    white-space: nowrap;
    transition: background 0.1s;

    &:hover {
      background: var(--fill-color-control-alt-secondary);
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
