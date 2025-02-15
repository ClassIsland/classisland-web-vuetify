<template>
  <v-app-bar class="pr-4" >
    <div class="d-flex ml-4 align-content-center">
      <v-app-bar-title class="align-content-center mr-2"> ClassIsland </v-app-bar-title>
      <v-tabs color="blue-lighten-3">
        <v-tab to="/">首页</v-tab>
        <v-tab to="/download">下载</v-tab>
        <v-tab href="https://docs.classisland.tech/" target="_blank" append-icon="mdi-open-in-new">文档</v-tab>
        <v-tab href="https://github.com/ClassIsland/ClassIsland" target="_blank" append-icon="mdi-open-in-new">GitHub 仓库</v-tab>
      </v-tabs>
    </div>

    <template v-slot:append>
      <div class="ga-4">
        <v-btn small variant="flat" color="blue-lighten-3" to="/download" prepend-icon="mdi-download">立即下载</v-btn>
      </div>
    </template>
  </v-app-bar>
</template>

<script setup>
import {useRouter} from "vue-router";
const router = useRouter();

</script>
