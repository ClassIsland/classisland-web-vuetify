<template>
  <v-footer height="auto" app>
    <a
      key="ClassIsland"
      href="/"
      title="ClassIsland"
      class="d-inline-block mx-2 social-link"
      rel="noopener noreferrer"
    >
      <v-icon :size="24" class="ci-logo">
        <SvgIcon name="logo-cilogo" size="24px" />
      </v-icon>
    </a>

    <a
      v-for="item in items"
      :key="item.title"
      :href="item.href"
      :title="item.title"
      class="d-inline-block mx-2 social-link"
      rel="noopener noreferrer"
      target="_blank"
    >
      <v-icon :icon="item.icon" :size="item.icon === '$vuetify' ? 24 : 16" />
    </a>

    <div class="text-caption text-disabled" style="position: absolute; right: 16px">
      &copy; 2023-{{ new Date().getFullYear() }}
      <span class="d-none d-sm-inline-block">ClassIsland</span>
      <span class="d-none d-sm-inline-block">&nbsp;|&nbsp;</span>
      <a
        href="https://beian.miit.gov.cn/"
        target="_blank"
        rel="noopener noreferrer"
        class="text-caption text-disabled"
      >
        沪ICP备2024084943号
      </a>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
import SvgIcon from './SvgIcon.vue';

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
</script>

<style scoped lang="sass">

.social-link :deep(.v-icon)
  color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
  text-decoration: none
  transition: .2s ease-in-out

  &:hover
    color: rgba(25, 118, 210, 1)
</style>
