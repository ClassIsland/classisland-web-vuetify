<template>
  <header class="fluent-app-bar">
    <div class="fluent-app-bar__content">
      <div class="fluent-app-bar__left">
        <FluentButton variant="text" class="nav-icon" @click="isNavDrawerOpen = !isNavDrawerOpen">
          <FluentSystemIcon name="navigation" />
        </FluentButton>
        <!-- Desktop Back Button (Optional, if navigation history exists) -->
        <!-- <FluentButton variant="text" class="back-icon" @click="goBack" v-if="canGoBack">
          <FluentSystemIcon name="arrowLeft" />
        </FluentButton> -->

        <RouterLink to="/" class="fluent-app-bar__title-link">
          <h1 class="fluent-app-bar__title">ClassIsland</h1>
        </RouterLink>
        <div class="fluent-app-bar__nav app-bar-tabs">
          <FluentSelectorBar :items="navItems" />
        </div>
      </div>
      <div class="fluent-app-bar__right">
        <FluentButton variant="primary" to="/download">
          <template #prepend><FluentSystemIcon name="arrowDownload" /></template>
          立即下载
        </FluentButton>
      </div>
    </div>
  </header>

  <!-- Mobile Drawer -->
  <transition name="slide-left">
    <div v-if="isNavDrawerOpen" class="fluent-drawer-overlay" @click="isNavDrawerOpen = false">
      <div class="fluent-drawer" @click.stop>
        <div class="fluent-drawer__header">
          <div class="fluent-drawer__header-left">
            <FluentButton variant="text" @click="isNavDrawerOpen = false">
              <FluentSystemIcon name="navigation" />
            </FluentButton>
            <!-- Search bar could go here if requested later -->
          </div>
        </div>
        <div class="fluent-drawer__content">
          <FluentSideNav :items="navItems" @click="isNavDrawerOpen = false" />
        </div>
        <div class="fluent-drawer__footer">
           <!-- Settings or other bottom items could go here -->
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import FluentButton from './fluent/FluentButton.vue';
import FluentSystemIcon from './FluentSystemIcon.vue';
import FluentSelectorBar from './fluent/FluentSelectorBar.vue';
import FluentSideNav from './fluent/FluentSideNav.vue';

const isNavDrawerOpen = ref(false);
const route = useRoute();

watch(
  () => route.fullPath,
  () => {
    isNavDrawerOpen.value = false;
  }
);

const navItems = [
  {
    icon: 'home',
    title: "首页",
    to: "/"
  },
  {
    icon: 'arrowDownload',
    title: "下载",
    to: "/download"
  },
  {
    icon: 'bookOpen',
    title: "文档",
    href: "https://docs.classisland.tech/",
    target: "_blank"
  },
  {
    icon: 'github',
    title: "GitHub 仓库",
    href: "https://github.com/ClassIsland/ClassIsland",
    target: "_blank"
  }
];
</script>

<style scoped lang="scss">
.fluent-app-bar {
  position: sticky; /* Changed to sticky as per previous tasks */
  top: 0;
  left: 0;
  right: 0;
  height: 48px; /* Adjusted height to match FDS Top Nav (was 64px) */
  background: var(--background-fill-color-layer-alt);
  background-color: color-mix(in srgb, var(--background-fill-color-layer-alt), transparent 100%); /* Fallback if variable is solid */
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--stroke-color-control-stroke-default);
  z-index: 1000;
  display: flex;
  align-items: center;

  /* Ensure background variable has some transparency if needed, or override here */
  /* Assuming --background-fill-color-layer-alt is solid, we can use rgba or just rely on the variable if it's already translucent in theme.
     If it's solid #ffffff / #2c2c2c, we need to make it translucent for backdrop-filter to work.
  */
  background: var(--fill-color-control-default); /* Use control default which is usually translucent */
  /* Or manually set based on theme if variable isn't translucent enough */
  background: rgba(255, 255, 255, 0.8);
  @media (prefers-color-scheme: dark) {
      background: rgba(44, 44, 44, 0.8);
  }
  /* Better yet, use a dedicated acrylic variable if available, or construct it */
  background: var(--background-fill-color-smoke-default); /* Smoke is usually dark overlay, not acrylic base */

  /* Let's try to use the layer-alt but with opacity override */
  background-color: rgba(255, 255, 255, 0.7);

  :root.v-theme--dark & {
      background-color: rgba(32, 32, 32, 0.7);
  }

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 0 24px;
    height: 100%;
  }

  &__left {
    display: flex;
    align-items: center;
    gap: 8px; /* Reduced gap */
    height: 100%;
  }

  &__title-link {
    text-decoration: none;
    color: inherit;
    margin-right: 12px;
    display: flex;
    align-items: center;
  }

  &__title {
    font-size: 14px; /* Smaller font size for FDS app title */
    font-weight: 600;
    margin: 0;
    font-family: var(--font-family-base);
    color: var(--fill-color-text-primary);
  }

  &__nav {
    display: flex;
    gap: 4px;
    height: 100%;
    align-items: center;
  }
}

/* Dark mode override within the component style block for specificity if not using global class */
@media (prefers-color-scheme: dark) {
  .fluent-app-bar {
    background-color: rgba(32, 32, 32, 0.7);
  }
}

.nav-icon {
  display: none;
  @media (max-width: 750px) {
    display: inline-flex;
  }
}

.app-bar-tabs {
  @media (max-width: 750px) {
    display: none;
  }
}

/* Drawer Styles */
.fluent-drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--background-fill-color-smoke-default);
  z-index: 2000;
  display: flex;
}

.fluent-drawer {
  width: 320px; /* Match side nav width from Figma roughly */
  height: 100%;
  background: var(--background-fill-color-layer-alt); /* Or solid background */
  box-shadow: var(--shadow-dialog);
  display: flex;
  flex-direction: column;

  &__header {
    height: 48px;
    display: flex;
    align-items: center;
    padding: 0 12px;
    /* Border bottom is usually not present in Side Nav pane header unless scrolled, but let's keep it clean */
  }

  &__content {
    padding: 4px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    overflow-y: auto;
    flex-grow: 1;
  }

  &__footer {
      padding: 4px;
  }
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: opacity 0.3s ease;
  .fluent-drawer {
    transition: transform 0.3s cubic-bezier(0.1, 0.9, 0.2, 1); /* Fluent ease */
  }
}

.slide-left-enter-from,
.slide-left-leave-to {
  opacity: 0;
  .fluent-drawer {
    transform: translateX(-100%);
  }
}
</style>
