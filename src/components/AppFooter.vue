<template>
  <v-footer height="auto" app class="d-flex flex-wrap ga-4 px-4">
    <div class="text-caption text-disabled" style="">
      &copy; 2023-{{ new Date().getFullYear() }}
      <span class="">ClassIsland</span>
    </div>
    <div class="text-caption text-disabled" style="">
      Build_{{ gitTag }}
    </div>
    <a
      href="https://beian.miit.gov.cn/"
      target="_blank"
      rel="noopener noreferrer"
      class="text-caption text-disabled"
    >
      津ICP备2025035356号
    </a>

    <a
      href="https://status.classisland.tech/"
      target="_blank"
      rel="noopener noreferrer"
      class="text-caption text-disabled"
    >
      服务状态
    </a>

    <div class="d-flex flex-row-reverse flex-grow-1">
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
const gitTag = __GIT_TAG__;

</script>

<style scoped lang="sass">

.social-link :deep(.v-icon)
  color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
  text-decoration: none
  transition: .2s ease-in-out

  &:hover
    color: rgba(25, 118, 210, 1)
</style>
