<template>
  <v-app-bar class="pr-4">
    <v-app-bar-title class="align-content-center"> ClassIsland </v-app-bar-title>

    <template v-slot:append>
      <div class="ga-4">
        <v-btn href="https://migrate.classisland.tech/"> 迁移到 ClassIsland </v-btn>
        <v-btn href="https://docs.classisland.tech/"> 文档 </v-btn>
        <v-btn href="https://github.com/ClassIsland/ClassIsland"> GitHub 仓库 </v-btn>
        <v-btn small variant="flat" color="primary" @click="gotoDownload">立即下载</v-btn>
      </div>
    </template>
  </v-app-bar>
</template>

<script setup>
function gotoDownload() {
  window.open('https://github.com/ClassIsland/ClassIsland/releases/latest/', '_blank');
}
</script>
