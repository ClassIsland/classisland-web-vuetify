<script setup lang="ts">
import {onMounted, ref} from "vue";
import DownloadPlatformCard from "../../../components/DownloadPlatformCard.vue";
import {IndexIds} from "../../../indexIds";

const isLoading = ref(true);
const downloadIndex = ref();
const latestVersionInfoMin = ref();
const latestVersionInfo = ref({
  Version: "",
  Title: "",
});

const downloadIndexNet6 = ref();
const latestVersionInfoMinNet6 = ref();
const latestVersionInfoNet6 = ref({
  Version: "",
  Title: "",
});

const channels = ref([]);
const selectedChannel = ref("stable");
const isDialogActive = ref(false);
const isError = ref(false);
const timeStamp = new Date().getTime();

const currentOs = ref("windows-10");
const currentArch = ref("x64");
const downloadInfos = {
  "windows_x64_full_singleFile": {
    title: "单文件完整版 x64"
  },
  "windows_x64_trimmed_singleFile": {
    title: "单文件精简版 x64"
  },
  "windows_x86_full_singleFile": {
    title: "单文件完整版 x86"
  },
  "windows_arm64_full_singleFile": {
    title: "单文件完整版 ARM64"
  }
}
const selectedPlatform = ref("");
const selectedDownloadInfoId = ref("windows_x64_full_singleFile");

import { useHead } from '@unhead/vue'
import SplitDownloadButton from '../../../components/SplitDownloadButton.vue';

useHead({
  title: '下载 ClassIsland | ClassIsland',
  meta: [
    {
      name: 'description',
      content: 'ClassIsland 是一款适用于班级大屏的课表信息显示工具。在此处下载 ClassIsland。',
    },
  ],
})

function getCPUArchitecture() {
  const ua = navigator.userAgent.toLowerCase();

  // 检测ARM架构
  if (/\b(arm|aarch64)\b/.test(ua)) return 'arm64';

  // 检测x86-64架构
  if (/\b(x64|x86_64|win64|amd64|wow64)\b/.test(ua)) return 'x64';

  // 检测x86架构
  if (/\b(x86|i686|win32)\b/.test(ua)) return 'x86';


  // 移动设备默认ARM
  if (/mobi|android|iphone|ipad|ipod/.test(ua)) return 'arm64';

  // 默认 x64
  return 'x64';
}

function getWindowsVersion() {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf("Windows NT 10.0") !== -1) return "10.0";
  if (userAgent.indexOf("Windows NT 6.2") !== -1) return "6.2";
  if (userAgent.indexOf("Windows NT 6.1") !== -1) return "6.1";
  if (userAgent.indexOf("Windows NT 6.0") !== -1) return "6.0";
  return null;
}


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
  try{
    console.log(IndexIds);
    const result = await fetch( IndexIds.get("main") + "?time=" + timeStamp);
    const json = await result.json();
    json.Versions.sort(compareVersion);
    json.Versions.reverse();
    downloadIndex.value = json;
    const resultNet6 = await fetch( IndexIds.get("net-6")+ "?time=" + timeStamp);
    const jsonNet6 = await resultNet6.json();
    jsonNet6.Versions.sort(compareVersion);
    jsonNet6.Versions.reverse();
    downloadIndexNet6.value = jsonNet6;

    for (let i in json.Channels) {
      let channel = json.Channels[i];
      channel.id = i;
      channels.value.push({
        id: i,
        title: i,
        props: {
          title: channel.Name,
          subtitle: channel.Description,
        }
      });
    }
    // selectedChannel.value = json.Channels.stable;

    await loadCurrentChannel();
  } catch (e) {
    isError.value = true;
    console.error(e);
  }
  isLoading.value = false;
}

async function getSelectedVersion(index) {
  console.log(index);
  let versionInfoMin = null;
  for (let i of index.Versions) {
    // console.log(i);
    if (i.Channels.includes(selectedChannel.value)) {
      versionInfoMin = i;
      break;
    }
  }
  if (versionInfoMin == null) {
    return null;
  }
  console.log(versionInfoMin);
  return await (await fetch(versionInfoMin.VersionInfoUrl + "?time=" + timeStamp)).json();
}

async function loadCurrentChannel() {
  console.log("当前通道：", selectedChannel.value);
  latestVersionInfo.value = await getSelectedVersion(downloadIndex.value);
  latestVersionInfoNet6.value = await getSelectedVersion(downloadIndexNet6.value);

  let platform = getWindowsVersion();
  if (platform != null) {
    selectedPlatform.value = platform === "10.0" ? "windows10" : "windows7";
    let infoId = `windows_${getCPUArchitecture()}_full_singleFile`;
    console.log("infoId: ", infoId)
    if (downloadInfos[infoId] != undefined){
      selectedDownloadInfoId.value = infoId;
    }
  }
}

async function updateChannelSelection() {
  isLoading.value = true;
  isError.value = false;
  await loadCurrentChannel();
  isLoading.value = false;
}

function showHelpDialog() {
  isDialogActive.value = true;
}

function refreshPage() {
  location.reload();
}

onMounted(() => init());
</script>

<template>
  <div class="d-flex download-container flex-column page-margin-x-wide">
    <div class="loading-mask d-flex"
         v-if="isLoading">
      <v-progress-circular color="blue-lighten-3" size="large"
                           indeterminate class="align-self-center"/>
    </div>
    <div v-else-if="!isError" class="d-flex flex-column mt-8">
      <h2 class="align-self-center text-center mb-4 text-h3 font-weight-bold">下载 ClassIsland 1.x</h2>
      <p class="text-center align-self-center mb-12">首先，选择适合您的平台和打包方式</p>
      <v-alert type="warning" variant="outlined"
               class="mb-4 fill-height"
               v-if="downloadIndex.Channels[selectedChannel].Warning"
               :text="downloadIndex.Channels[selectedChannel].Warning"></v-alert>
      <v-alert type="info" variant="outlined"
               class="mb-4 fill-height"
               icon="mdi-bullhorn"
               color="blue-lighten-3"
               text="ClassIsland 2 现已可用。">
        <template v-slot:append>
          <v-btn variant="text" style="margin: -8px 0;"
                 to="/download/v2">前往下载</v-btn>
        </template>
      </v-alert>
      <div class="align-self-stretch d-flex ga-4 justify-center platforms-container flex-column flex-md-row flex-row
                   align-content-start">
        <DownloadPlatformCard platform-name="Windows 10+"
                              platform-icon="mdi-microsoft-windows"
                              description="适用于 Windows 10 以及以上的版本。"
                              class="platform"
                              :version="latestVersionInfo.Title">
          <div class="d-flex flex-column align-center mt-2">
            <SplitDownloadButton :download-infos="downloadInfos"
                                 title="下载便携版"
                                 :is-selected='selectedPlatform === "windows10"'
                                 :selectedDownloadInfo="selectedDownloadInfoId"
                                 :download-route-root='"/download/thank_you/main/" + latestVersionInfo.Version + "/"'/>
          </div>

        </DownloadPlatformCard>
        <DownloadPlatformCard platform-name="Windows 7"
                              platform-icon="mdi-microsoft-windows"
                              description="适用于 Windows 7 SP1 ~ 8.1 版本。部分功能可能不可用。"
                              class="platform"
                              :version="latestVersionInfoNet6.Title">
          <div class="d-flex flex-column align-center mt-2">
            <SplitDownloadButton :download-infos="downloadInfos"
                                 title="下载便携版"
                                 :is-selected='selectedPlatform === "windows7"'
                                 :selectedDownloadInfo="selectedDownloadInfoId"
                                 :download-route-root='"/download/thank_you/net-6/" + latestVersionInfoNet6.Version + "/"'/>
          </div>
        </DownloadPlatformCard>
        <DownloadPlatformCard platform-name="Linux"
                              platform-icon="mdi-linux"
                              class="platform"
                              description="ClassIsland 2 现已支持 Linux 系统，您可以点击下方链接了解更多信息。">
          <v-btn color="blue-lighten-3" prepend-icon="mdi-download" variant="text"
                 to="/download/v2" >下载 ClassIsland 2</v-btn>
        </DownloadPlatformCard>
      </div>
      <div class="d-flex flex-row flex-wrap ga-4 justify-center align-self-center align-content-center mt-8">
        <v-select
          v-model="selectedChannel"
          label="发行通道"
          :items="channels"
          variant="outlined"
          width="250px"
          item-title="props.Name"
          item-value="id"
          @update:model-value="updateChannelSelection"
        >
        </v-select>
      </div>
      <div class="d-flex flex-row flex-wrap ga-4 justify-center align-self-center align-content-center mb-4">
        <v-btn color="blue-lighten-3" variant="text" prepend-icon="mdi-help-circle"
               @click="showHelpDialog">完整版 vs 精简版</v-btn>
        <v-btn color="blue-lighten-3" variant="text" prepend-icon="mdi-download"
               href="https://github.com/ClassIsland/ClassIsland/releases/"
               target="_blank">查看全部下载</v-btn>
        <v-btn color="blue-lighten-3" variant="text" prepend-icon="mdi-wrench"
               href="https://github.com/ClassIsland/ClassIsland/actions/workflows/build_release.yml"
               target="_blank">下载 CI 构建</v-btn>
      </div>
    </div>
    <div v-else-if="isError" class="flex-column mt-12 ">
      <div class="page-margin-x">
        <h2 class="align-self-center text-center mb-6 text-h3 font-weight-bold">Σ(っ °Д °;)っ</h2>
        <h2 class="align-self-center text-center mb-6 text-h4 font-weight-bold">出错啦！</h2>
        <p class="text-center align-self-center mb-16">无法获取下载信息，可能是下载服务器目前不可用。</p>

        <div class="justify-center d-flex flex-row flex-wrap ga-4">
          <v-btn color="blue-lighten-3" prepend-icon="mdi-refresh" @click="refreshPage">刷新页面</v-btn>
          <v-btn prepend-icon="mdi-github" href="https://github.com/ClassIsland/ClassIsland/releases"
                 target="_blank">前往 GitHub 下载</v-btn>
        </div>
      </div>


    </div>

    <v-dialog max-width="500" v-model="isDialogActive">
      <v-card title="完整版 vs 精简版">
        <v-card-text>
          精简版与完整版相比，移除了不必要的资源文件（字体、文档等）以缩小应用体积，同时功能保持不变。您可以根据需要选择要使用的版本。
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="关闭"
            @click="isDialogActive = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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


.platform {
  flex-basis: 33.3333%;
}
</style>
