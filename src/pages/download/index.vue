<script setup lang="ts">
import {ref} from "vue";
import DownloadPlatformCard from "../../components/DownloadPlatformCard.vue";

const isLoading = ref(true);
const downloadIndex = ref();
const latestVersionInfoMin = ref();
const latestVersionInfo = ref();

const downloadLinkWin10SingleFileFull = ref("");
const downloadLinkWin10SingleFileTrimmed = ref("");

function compareVersion(a, b) {
  const versionA = a.Version.split('.');
  const versionB = b.Version.split('.');
  for  (let i = 0; i < Math.min(versionA.length, versionB.length); i++) {
    if (versionA[i] > versionB[i]) {
      return versionA[i] - versionB[i];
    }
    if (versionA[i] < versionB[i]) {
      return versionA[i] - versionB[i];
    }
  }
  return versionA.length - versionB.length;
}

async function init(){
  const result = await fetch("https://get.classisland.tech/d/ClassIsland-Ningbo-S3/classisland/disturb/index.json");
  const json = await result.json();
  isLoading.value = false;
  json.Versions.sort(compareVersion);
  json.Versions.reverse();
  downloadIndex.value = json;
  latestVersionInfoMin.value = json.Versions[0];
  console.log(latestVersionInfoMin.value);
  const resultVersion = await fetch(latestVersionInfoMin.value.VersionInfoUrl);
  latestVersionInfo.value = await resultVersion.json();
  console.log(latestVersionInfo.value);

  downloadLinkWin10SingleFileFull.value = `/download/thank_you/main/${latestVersionInfo.value.Version}/windows_x64_full_singleFile`
  downloadLinkWin10SingleFileTrimmed.value = `/download/thank_you/main/${latestVersionInfo.value.Version}/windows_x64_trimmed_singleFile`
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
    <div v-else class="download-container flex-column align-self-center mt-8">
      <h2 class="align-self-center text-center mb-4 text-h3 font-weight-bold">下载 ClassIsland</h2>
      <p class="text-center align-self-center mb-12">首先，选择适合您的平台和打包方式</p>
      <div class="align-self-center d-flex flex-row gc-12 flex-wrap justify-center">
        <DownloadPlatformCard platform-name="Windows 10"
                              platform-icon="mdi-microsoft-windows"
                              description="适用于 Windows 10 以及以上的版本。">
          <v-btn color="blue-lighten-3" prepend-icon="mdi-download" variant="text"
                 :href='downloadLinkWin10SingleFileFull'>单文件完整版</v-btn>
          <v-btn color="blue-lighten-3" prepend-icon="mdi-download" variant="text"
                 :href='downloadLinkWin10SingleFileTrimmed'>单文件精简版</v-btn>
        </DownloadPlatformCard>
        <DownloadPlatformCard platform-name="Windows 7 兼容版"
                              platform-icon="mdi-microsoft-windows"
                              description="适用于 Windows 7 SP1 ~ 8.1 版本。部分功能可能不可用。">
          <v-btn color="blue-lighten-3" prepend-icon="mdi-download" variant="text">单文件完整版</v-btn>
          <v-btn color="blue-lighten-3" prepend-icon="mdi-download" variant="text">单文件精简版</v-btn>
        </DownloadPlatformCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading-mask {
  align-self: center;
  height: 100%;
}

.download-container {
  height: 100%;
}
</style>
