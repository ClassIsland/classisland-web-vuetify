<template>
  <v-footer height="auto" app class="d-flex flex-wrap ga-4 px-4">
    <div class="text-caption text-disabled" style="">
      &copy; 2023-{{ new Date().getFullYear() }}
      <span class="">ClassIsland</span>


    </div>
    <a
      href="https://beian.miit.gov.cn/"
      target="_blank"
      rel="noopener noreferrer"
      class="text-caption text-disabled"
    >
      沪ICP备2024084943号
    </a>

    <div class="d-flex">
      <img src="https://www.beian.gov.cn/img/new/gongan.png" class=""/>
      <a href="https://beian.mps.gov.cn/#/query/webSearch"
         target="_blank"
         rel="noopener noreferrer"
         class="text-caption text-disabled text-center">沪公网安备31012002006157号</a>
    </div>

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
</script>

<style scoped lang="sass">

.social-link :deep(.v-icon)
  color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
  text-decoration: none
  transition: .2s ease-in-out

  &:hover
    color: rgba(25, 118, 210, 1)
</style>
