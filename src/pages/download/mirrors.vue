<script setup lang="ts">
import { useHead } from '@unhead/vue';

useHead({
  title: '下载镜像 | ClassIsland',
  meta: [
    {
      name: 'description',
      content: 'ClassIsland 是一款适用于班级大屏的课表信息显示工具。如果您在通过官方下载源或 GitHub 下载 ClassIsland 时遇到问题，可以从此处的镜像下载 ClassIsland。',
    },
  ],
})
</script>

<template>
  <div class="margin-x flex-col ga-4 d-flex mt-6">
    <h1 class="text-h4">下载镜像</h1>
    <p>如果您在通过官方下载源或 GitHub 下载 ClassIsland 时遇到问题，可以从以下镜像下载 ClassIsland。</p>
    <ul class="list-disc">
      <li><a href="https://mirrors.cqu.edu.cn/github-release/ClassIsland/ClassIsland/">重庆大学开源软件镜像站</a> </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
ul li::marker{
  margin-left: 16px;
}
</style>
