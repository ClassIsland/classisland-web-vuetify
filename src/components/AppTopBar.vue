<template>
  <v-app-bar class="pr-4  position-fixed">
    <div class="ml-2 align-content-center d-flex">
      <div class="d-flex flex-row align-center">
        <v-app-bar-nav-icon variant="text" class="nav-icon" @click="isNavDrawerOpen = !isNavDrawerOpen"/>
        <RouterLink to="/" class="text-decoration-none" style="color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));">
          <v-app-bar-title class="align-content-center mx-2"> ClassIsland </v-app-bar-title>
        </RouterLink>
      </div>
      <div class="app-bar-tabs">
        <v-tabs color="blue-lighten-3">
          <v-tab v-for="i in navItems" v-bind:key="i.title"
                 :append-icon='i.href ? "mdi-open-in-new" : ""'
                 :to="i.to" :href="i.href"
                 :target='i.href ? "_blank" : ""'>
            {{ i.title }}
          </v-tab>
        </v-tabs>
      </div>
    </div>

    <template v-slot:append>
      <div class="ga-4">
        <v-btn small variant="flat" color="blue-lighten-3" to="/download" prepend-icon="mdi-download">立即下载</v-btn>
      </div>
    </template>
  </v-app-bar>

  <v-navigation-drawer
    class="position-fixed"
    v-model="isNavDrawerOpen"
    temporary
  >
    <v-list
    >
      <v-list-item
        v-for="i in navItems"
        v-bind:key="i.title"
        :append-icon='i.href ? "mdi-open-in-new" : ""'
        :to="i.to" :href="i.href"
        :target='i.href ? "_blank" : ""'
        :prepend-icon="i.icon"
      >
        {{ i.title }}
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<style scoped>
.app-bar-tabs {
  @media (max-width: 750px) {
    display: none;
  }
}

.nav-icon {
  @media (min-width: 750px) {
    display: none;
  }
}
</style>

<script setup>
const isNavDrawerOpen = ref(false);

const navItems = [
  {
    icon: "mdi-home",
    title: "首页",
    to: "/"
  },
  {
    icon: "mdi-download",
    title: "下载",
    to: "/download"
  },
  {
    icon: "mdi-book-open-variant",
    title: "文档",
    href: "https://docs.classisland.tech/"
  },
  {
    icon: "mdi-github",
    title: "GitHub 仓库",
    href: "https://github.com/ClassIsland/ClassIsland"
  }
];

</script>
