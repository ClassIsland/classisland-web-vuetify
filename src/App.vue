<template>
  <v-app>
    <AppTopBar />
    <v-main>
      <router-view />
    </v-main>
    <AppFooter class="position-absolute" />
  </v-app>
</template>

<script lang="ts" setup>
import AppTopBar from './components/AppTopBar.vue';
import AppFooter from './components/AppFooter.vue';
</script>

<style></style>
