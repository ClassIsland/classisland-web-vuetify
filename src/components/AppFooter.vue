<template>
  <footer class="fluent-footer">
    <div class="fluent-footer__content">
      <div class="fluent-footer__text">
        &copy; 2023-{{ new Date().getFullYear() }} ClassIsland
      </div>
      <div class="fluent-footer__text">
        Build_{{ gitTag }}
      </div>
      <a
        href="https://beian.miit.gov.cn/"
        target="_blank"
        rel="noopener noreferrer"
        class="fluent-footer__link"
      >
        津ICP备2025035356号
      </a>

      <a
        href="https://status.classisland.tech/"
        target="_blank"
        rel="noopener noreferrer"
        class="fluent-footer__link"
      >
        服务状态
      </a>

      <div class="fluent-footer__social">
        <a
          v-for="item in items"
          :key="item.title"
          :href="item.href"
          :title="item.title"
          class="fluent-footer__social-link"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span :class="`mdi ${item.icon}`" style="font-size: 16px;"></span>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

const items = [
  {
    title: 'QQ群',
    icon: 'mdi-qqchat',
    href: 'https://qm.qq.com/q/4NsDQKiAuQ'
  },
  {
    title: 'GitHub',
    icon: `mdi-github`,
    href: 'https://github.com/ClassIsland/ClassIsland'
  },
  {
    title: '电子邮件',
    icon: `mdi-email-outline`,
    href: 'mailto:wrc@classisland.tech'
  }
];
const gitTag = __GIT_TAG__;

</script>

<style scoped lang="scss">
.fluent-footer {
  /* Removed position absolute, relying on flex layout in parent */
  background: var(--background-fill-color-solid-background-base);
  padding: 24px;
  border-top: 1px solid var(--stroke-color-surface-stroke-default);
  font-family: var(--font-family-base);
  font-size: 12px;
  color: var(--fill-color-text-secondary);
  width: 100%;

  &__content {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  &__text {
    color: inherit;
  }

  &__link {
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
      color: var(--fill-color-text-primary);
    }
  }

  &__social {
    margin-left: auto;
    display: flex;
    gap: 12px;
  }

  &__social-link {
    color: inherit;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    transition: background 0.2s, color 0.2s;

    &:hover {
      background: var(--fill-color-control-alt-secondary);
      color: var(--fill-color-accent-default);
    }
  }
}
</style>
