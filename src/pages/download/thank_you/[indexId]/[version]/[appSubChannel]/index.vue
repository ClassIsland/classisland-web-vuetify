<script setup lang="ts">
import {ref} from "vue";
import { useRoute } from 'vue-router';
import {IndexIds} from "../../../../../../indexIds";

const isLoading = ref(true);
const downloadIndex = ref();
const latestVersionInfo = ref({
  Version: "",
  Title: "",
  DownloadInfos: {}
});
const selectedSubChannel = ref({
  ArchiveDownloadUrls: {
    main: ""
  },
  ArchiveSHA256: "",
  DeployMethod: 0
});

const route = useRoute();
const indexId = route.params.indexId;
const version = route.params.version;
const appSubChannel = route.params.appSubChannel;

async function init(){
  const result = await fetch(IndexIds.get(indexId.toString()));
  const json = await result.json();
  downloadIndex.value = json;
  let versionIndoMin = null;
  for (var x in json.Versions) {
    if (json.Versions[x].Version == version.toString()) {
      versionIndoMin = json.Versions[x];
      break;
    }
  }
  if (versionIndoMin == null) {
    return;
  }
  console.log(versionIndoMin);
  const resultVersion = await fetch(versionIndoMin.VersionInfoUrl);
  latestVersionInfo.value = await resultVersion.json();
  console.log(latestVersionInfo.value);
  selectedSubChannel.value = latestVersionInfo.value.DownloadInfos[appSubChannel.toString()];
  console.log(selectedSubChannel.value);

  isLoading.value = false;
  // downloadArchive();
}

function downloadArchive() {
  let link = document.createElement('a');
  link.style.display = 'none';
  link.href = selectedSubChannel.value.ArchiveDownloadUrls.main;
  link.download = "ClassIsland_" + appSubChannel + "_" + version.toString() + ".zip";
  document.body.appendChild(link);
  link.click();
}

init();
</script>

<template>
  <div class="d-flex download-container flex-column">
    <div class="loading-mask d-flex"
         v-if="isLoading">
      <v-progress-circular color="blue-lighten-3" size="large"
                           indeterminate class="align-self-center"/>
    </div>
    <div v-show="!isLoading" class="flex-column mt-12 ">
      <div class="page-margin-x">
        <h2 class="align-self-center text-center mb-6 text-h2 font-weight-bold download-main-title">感谢下载 ClassIsland {{ latestVersionInfo.Title }} ！</h2>
        <p class="text-center align-self-center mb-16">您的下载即将开始。如果下载在 30 秒内没有开始，请点击<a :href="selectedSubChannel.ArchiveDownloadUrls.main" id="downloadLink" :download='"ClassIsland_" + appSubChannel + "_" + version + ".zip"'>此处</a>手动开始下载。</p>

        <v-text-field label="直接下载链接" variant="outlined" v-model="selectedSubChannel.ArchiveDownloadUrls.main" append-icon="mdi-content-copy"/>
        <v-text-field label="校验和（SHA256）" variant="outlined" v-model="selectedSubChannel.ArchiveSHA256" append-icon="mdi-content-copy"/>

        <p>请注意核对文件 SHA256 是否正确。</p>
      </div>

      <div class="page-margin-x py-4 mt-8">
        <h2>三步安装 ClassIsland</h2>
        <div class="d-flex flex-row my-4 ga-6 flex-wrap">
          <div class="setup-step">
            <h3>第一步：解压应用</h3>
            <p>在一个合适的地方（比如 D 盘等）新建一个文件夹，将下载的压缩包中的文件解压到文件夹中。</p>
          </div>
          <div class="setup-step">
            <h3>第二步：安装 .NET 运行时</h3>
            <p>运行应用，如果您的设备没有安装 .NET 运行时，可以根据启动应用后的弹窗的步骤安装 .NET 运行时。</p>
          </div>
          <div class="setup-step">
            <h3>第三步：开始使用</h3>
            <p>完成上述步骤后，再次运行应用，根据应用弹出的欢迎向导完成应用设置。</p>
          </div>
        </div>
        <p>更多安装说明请参见文档<a href="https://docs.classisland.tech/app/setup.html" target="_blank">安装与开始</a>。</p>
      </div>

      <v-sheet>
        <div class="page-margin-x py-4 mt-8">
          <h2>接下来……</h2>
          <p class="mt-2">通过以下资源快速上手 ClassIsland，编排/导入您的第一个课表。</p>
          <div class="d-flex flex-row my-4 ga-6 flex-wrap">
            <v-card text="在 BiliBili 上观看 ClassIsland 入门教程视频，十分钟入门 ClassIsland。" variant="outlined" class="setup-step" title="观看入门教程视频"
                    prepend-icon="mdi-video"
                    href="https://www.bilibili.com/video/BV1fA4m1A7uZ/"/>
            <v-card text="深入了解 ClassIsland。" variant="outlined" class="setup-step" title="浏览帮助文档"
                    prepend-icon="mdi-book-open-variant"
                    href="https://docs.classisland.tech/app/"/>
          </div>
        </div>
      </v-sheet>

      <div class="page-margin-x py-4 my-8">
        <h2 class="text-center mb-2">了解更多</h2>
        <div class="d-flex flex-row justify-center ga-2 flex-wrap">
          <v-btn prepend-icon="mdi-github" href="https://github.com/ClassIsland/ClassIsland" target="_blank">查看 GitHub 仓库</v-btn>
          <v-btn prepend-icon="mdi-book-open-variant" href="https://docs.classisland.tech" target="_blank">浏览应用文档</v-btn>
          <v-btn prepend-icon="mdi-message-outline" href="https://docs.classisland.tech/community/" target="_blank">加入讨论社区</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.download-main-title {
  background-image: linear-gradient(135deg, #26c4ce, #b3f3c6);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.loading-mask {
  align-self: center;
  height: 100%;
}

.download-container {
  height: 100%;
}

.setup-step{
  flex: 1;
  min-width: 200px;
}

.page-margin-x {
  margin: 0 42px;
  @media (max-width: 600px) {
    margin: 0 12px
  }
}
</style>
