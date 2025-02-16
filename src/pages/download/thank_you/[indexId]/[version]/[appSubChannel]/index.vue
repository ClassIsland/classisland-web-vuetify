<script setup lang="ts">
import {onMounted, ref} from "vue";
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
const isError = ref(false);
const timeStamp = new Date().getTime();

const route = useRoute();
const indexId = route.params.indexId;
const version = route.params.version;
const appSubChannel = route.params.appSubChannel;
const showCopiedSnackbar = ref(false);

async function init(){
  try {
    const result = await fetch(IndexIds.get(indexId.toString()) + "?time=" + timeStamp);
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
      isError.value = true;
      isLoading.value = false;
      return;
    }
    console.log(versionIndoMin);
    const resultVersion = await fetch(versionIndoMin.VersionInfoUrl + "?time=" + timeStamp);

    let info = await resultVersion.json();
    if (info == null){
      isError.value = true;
      isLoading.value = false;
      return;
    }
    latestVersionInfo.value = info;
    console.log(latestVersionInfo.value);
    let subChannel = latestVersionInfo.value.DownloadInfos[appSubChannel.toString()];
    if (subChannel == null){
      isError.value = true;
      isLoading.value = false;
      return;
    }
    selectedSubChannel.value = subChannel;
    console.log(selectedSubChannel.value);

    downloadArchive();
  } catch (e) {
    console.error(e);
    isError.value = true;
  }
  isLoading.value = false;
}


function downloadArchive() {
  let link = document.createElement('a');
  link.style.display = 'none';
  link.href = selectedSubChannel.value.ArchiveDownloadUrls.main;
  link.download = "ClassIsland_" + appSubChannel + "_" + version.toString() + ".zip";
  document.body.appendChild(link);
  link.click();
}

function copyDownloadUrl(){
  navigator.clipboard.writeText(selectedSubChannel.value.ArchiveDownloadUrls.main);
  showCopiedSnackbar.value = true;
}

function copyChecksum() {
  navigator.clipboard.writeText(selectedSubChannel.value.ArchiveSHA256);
  showCopiedSnackbar.value = true;
}

onMounted(() => init());
</script>

<template>
  <div class="d-flex download-container flex-column">
    <div class="loading-mask d-flex"
         v-if="isLoading">
      <v-progress-circular color="blue-lighten-3" size="large"
                           indeterminate class="align-self-center"/>
    </div>
    <div v-show="!isLoading && !isError" class="flex-column mt-12 ">
      <div class="page-margin-x">
        <h2 class="align-self-center text-center mb-6 text-h2 font-weight-bold download-main-title">感谢下载 ClassIsland {{ latestVersionInfo.Title }} ！</h2>
        <p class="text-center align-self-center mb-16">您的下载即将开始。如果下载在 30 秒内没有开始，请点击<a :href="selectedSubChannel.ArchiveDownloadUrls.main" id="downloadLink" :download='"ClassIsland_" + appSubChannel + "_" + version + ".zip"'>此处</a>手动开始下载。</p>

        <v-text-field label="直接下载链接" variant="outlined" readonly v-model="selectedSubChannel.ArchiveDownloadUrls.main" append-icon="mdi-content-copy" @click:append="copyDownloadUrl"/>
        <v-text-field label="校验和（SHA256）" variant="outlined" readonly v-model="selectedSubChannel.ArchiveSHA256" append-icon="mdi-content-copy" @click:append="copyChecksum"/>

        <p>请注意核对文件 SHA256 是否正确。</p>
      </div>

      <div class="page-margin-x py-4 mt-8">
        <h2>三步安装 ClassIsland</h2>
        <div class="d-flex flex-row my-4 ga-6 flex-wrap">
          <div class="setup-step">
            <v-img src="../../../../../../assets/setup/singleFile/1.png" class="mb-4"/>
            <h3>第一步：解压应用</h3>
            <p>在一个合适的地方（比如 D 盘等）新建一个文件夹，将下载的压缩包中的文件解压到文件夹中。</p>
          </div>
          <div class="setup-step">
            <v-img src="../../../../../../assets/setup/singleFile/2.png" class="mb-4"/>
            <h3>第二步：安装 .NET 运行时</h3>
            <p>运行应用，如果您的设备没有安装 .NET 运行时，可以根据启动应用后的弹窗的指示安装 .NET 运行时。</p>
          </div>
          <div class="setup-step">
            <v-img src="../../../../../../assets/setup/singleFile/3.png" class="mb-4"/>
            <h3>第三步：开始使用</h3>
            <p>完成上述步骤后，再次运行应用，根据应用弹出的欢迎向导即可完成应用设置。</p>
          </div>
        </div>
        <v-alert type="info" variant="outlined" text="Tips：本软件会在安装文件夹中储存所有配置。在配置完成后，您可以直接将该文件夹带到学校使用。"
                 class="mb-4" color="blue-lighten-3"/>
        <p>更详细的安装说明请参见文档<a href="https://docs.classisland.tech/app/setup.html" target="_blank">安装与开始</a>。</p>
      </div>

      <v-sheet class="elevated-sheet">
        <div class="page-margin-x py-4 mt-8">
          <h2>快速上手 ClassIsland</h2>
          <p class="mt-2">通过以下资源快速上手 ClassIsland，编排/导入您的第一个课表。</p>
          <div class="d-flex flex-row my-4 ga-6 flex-wrap">
            <v-card text="在 BiliBili 上观看 ClassIsland 入门教程视频，十分钟入门 ClassIsland。" variant="outlined" class="setup-step" title="观看入门教程视频"
                    prepend-icon="mdi-video"
                    target="_blank"
                    href="https://www.bilibili.com/video/BV1fA4m1A7uZ/"/>
            <v-card text="深入了解 ClassIsland。" variant="outlined" class="setup-step" title="浏览帮助文档"
                    prepend-icon="mdi-book-open-variant"
                    target="_blank"
                    href="https://docs.classisland.tech/app/"/>
          </div>

          <p>使用过其它课表软件？您可以使用 CSES 或 <a href="https://migrate.classisland.tech/" target="_blank">ClassIsland 迁移向导</a>快速从其它课表软件导入课表。</p>

        </div>
      </v-sheet>

      <div class="page-margin-x py-4 my-8">
        <h2 class="text-center mb-2">了解更多</h2>
        <div class="d-flex flex-row justify-center ga-2 flex-wrap mb-4">
          <v-btn prepend-icon="mdi-github" href="https://github.com/ClassIsland/ClassIsland" target="_blank">查看 GitHub 仓库</v-btn>
          <v-btn prepend-icon="mdi-book-open-variant" href="https://docs.classisland.tech" target="_blank">浏览应用文档</v-btn>
          <v-btn prepend-icon="mdi-message-outline" href="https://docs.classisland.tech/community/" target="_blank">加入讨论社区</v-btn>
        </div>
        <p class="text-center ">如果这个项目对您有帮助，<a href="https://github.com/ClassIsland/ClassIsland" target="_blank">请点亮 Star ⭐</a></p>
      </div>
    </div>
    <div v-if="!isLoading && isError " class="flex-column mt-12 ">
      <div class="page-margin-x">
        <h2 class="align-self-center text-center mb-6 text-h3 font-weight-bold">Σ(っ °Д °;)っ</h2>
        <h2 class="align-self-center text-center mb-6 text-h4 font-weight-bold">出错啦！</h2>
        <p class="text-center align-self-center mb-16">找不到请求的下载信息。可能是您提供的链接有误，或下载服务器暂时不可用。</p>

        <div class="justify-center d-flex flex-row flex-wrap">
          <v-btn color="blue-lighten-3" prepend-icon="mdi-home" to="/download">返回下载首页</v-btn>
        </div>
      </div>


    </div>

    <v-snackbar
      v-model="showCopiedSnackbar"
    >
      已复制到剪贴板。
    </v-snackbar>
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

.elevated-sheet {
  background: linear-gradient(135deg, #26c4ce44, #b3f3c644);
}
</style>
