<script setup lang="ts">

import { ref } from 'vue';

const props = defineProps({
  downloadInfos: {},
  downloadRouteRoot: String,
  selectedDownloadInfo: String,
  title: String,
  isSelected: Boolean
});
// const on = ref(false);
</script>

<template>

  <v-menu bottom offset-y >

    <template v-slot:activator="{ props }">
      <div class="split-btn">
        <v-btn :variant='isSelected ? "elevated" : "outlined"' color="blue-lighten-3" class="main-btn" prepend-icon="mdi-download"
               :to='downloadRouteRoot + selectedDownloadInfo'>
          <div class="d-inline text-center">
            <span :class='isSelected ? "font-weight-bold" : ""'>{{ title }}</span>
            <br/>
            <span style="font-size: 11px" class="my-1">
              {{ downloadInfos[selectedDownloadInfo].title }}
            </span>
          </div>
        </v-btn>
        <v-btn :variant='isSelected ? "elevated" : "outlined"' v-bind="props" color="blue-lighten-3" class="actions-btn"><v-icon left>mdi-menu-down</v-icon></v-btn>
      </div>
    </template>

    <v-list >
      <v-list-item
        v-for="(item, index) in downloadInfos"
        :key="index"
        prepend-icon="mdi-download"
        :to='downloadRouteRoot + index'
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>

    </v-list>
  </v-menu>
</template>

<style scoped>

.split-btn{
  display: inline-block;
  --v-btn-height: 48px !important;

  .main-btn{
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    --v-btn-height: 48px !important;

    /* padding-right: 2px !important;*/
  }
  .actions-btn{
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    --v-btn-height: 48px !important;
    padding: 0 !important;
    min-width: 35px !important;
    margin-left: -1px;
  }
}
</style>
