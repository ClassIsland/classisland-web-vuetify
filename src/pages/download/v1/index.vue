<script setup lang="ts">
import {onMounted, ref, computed} from "vue";
import DownloadPlatformCard from "../../../components/DownloadPlatformCard.vue";
import {IndexIds} from "../../../indexIds";
import { useHead } from '@unhead/vue'
import SplitDownloadButton from '../../../components/SplitDownloadButton.vue';
import FluentButton from '../../../components/fluent/FluentButton.vue';
import FluentComboBox from '../../../components/fluent/FluentComboBox.vue';
import FluentDialog from '../../../components/fluent/FluentDialog.vue';
import FluentInfoBar from '../../../components/fluent/FluentInfoBar.vue';
import FluentProgressRing from '../../../components/fluent/FluentProgressRing.vue';
import FluentSystemIcon from '../../../components/FluentSystemIcon.vue';

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

const channels = ref<any[]>([]);
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


function compareVersion(a: any, b: any) {
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

async function getSelectedVersion(index: any) {
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
    // @ts-ignore
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

const comboBoxItems = computed(() => {
  return channels.value.map(c => ({
    text: c.props.title,
    value: c.id
  }));
});
</script>

<template>
  <div class="d-flex download-container flex-column page-margin-x-wide">
    <div class="loading-mask d-flex"
         v-if="isLoading">
      <div class="align-self-center">
        <v-progress-circular size="48" indeterminate color="fill-color-accent-default"/>
      </div>
    </div>
    <div v-else-if="!isError" class="d-flex flex-column mt-8">
      <h2 class="align-self-center text-center mb-4 text-h3 font-weight-bold fluent-title">下载 ClassIsland 1.x</h2>
      <p class="text-center align-self-center mb-12 fluent-subtitle">首先，选择适合您的平台和打包方式</p>

      <div class="mb-4 fill-height" v-if="downloadIndex.Channels[selectedChannel].Warning">
        <FluentInfoBar severity="warning" :message="downloadIndex.Channels[selectedChannel].Warning" />
      </div>

      <div class="mb-4 fill-height">
        <FluentInfoBar severity="info" title="ClassIsland 2 现已可用。" closable>
          <template #actions>
            <FluentButton variant="hyperlink" to="/download/v2">前往下载</FluentButton>
          </template>
        </FluentInfoBar>
      </div>

      <div class="align-self-stretch d-flex ga-4 justify-center platforms-container flex-column flex-md-row flex-row
                   align-content-start">
        <DownloadPlatformCard platform-name="Windows 10+"
                              platform-icon="windows"
                              description="适用于 Windows 10 以及以上的版本。"
                              class="platform"
                              :version="latestVersionInfo.Title">
          <div class="d-flex flex-column align-center mt-2">
            <SplitDownloadButton :download-infos="downloadInfos"
                                 title="下载便携版"
                                 :is-selected='selectedPlatform === "windows10"'
                                 :selectedDownloadInfo="selectedDownloadInfoId"
                                 variant="primary"
                                 :download-route-root='"/download/thank_you/main/" + latestVersionInfo.Version + "/"'/>
          </div>

        </DownloadPlatformCard>
        <DownloadPlatformCard platform-name="Windows 7"
                              platform-icon="windows"
                              description="适用于 Windows 7 SP1 ~ 8.1 版本。部分功能可能不可用。"
                              class="platform"
                              :version="latestVersionInfoNet6.Title">
          <div class="d-flex flex-column align-center mt-2">
            <SplitDownloadButton :download-infos="downloadInfos"
                                 title="下载便携版"
                                 :is-selected='selectedPlatform === "windows7"'
                                 :selectedDownloadInfo="selectedDownloadInfoId"
                                 variant="primary"
                                 :download-route-root='"/download/thank_you/net-6/" + latestVersionInfoNet6.Version + "/"'/>
          </div>
        </DownloadPlatformCard>
        <DownloadPlatformCard platform-name="Linux"
                              platform-icon="linux"
                              class="platform"
                              description="ClassIsland 2 现已支持 Linux 系统，您可以点击下方链接了解更多信息。">
          <FluentButton variant="hyperlink" to="/download/v2">
            <template #prepend><FluentSystemIcon name="arrowDownload" /></template>
            下载 ClassIsland 2
          </FluentButton>
        </DownloadPlatformCard>
      </div>
      <div class="d-flex flex-row flex-wrap ga-4 justify-center align-self-center align-content-center mt-8">
        <FluentComboBox
          v-model="selectedChannel"
          :items="comboBoxItems"
          item-text="text"
          item-value="value"
          placeholder="发行通道"
          width="250px"
          @update:model-value="updateChannelSelection"
        />
      </div>
      <div class="d-flex flex-row flex-wrap ga-4 justify-center align-self-center align-content-center mb-4">
        <FluentButton variant="hyperlink" @click="showHelpDialog">
          <template #prepend><FluentSystemIcon name="questionCircle" /></template>
          完整版 vs 精简版
        </FluentButton>
        <FluentButton variant="hyperlink" href="https://github.com/ClassIsland/ClassIsland/releases/" target="_blank">
          <template #prepend><FluentSystemIcon name="arrowDownload" /></template>
          查看全部下载
        </FluentButton>
        <FluentButton variant="hyperlink" href="https://github.com/ClassIsland/ClassIsland/actions/workflows/build_release.yml" target="_blank">
          <template #prepend><FluentSystemIcon name="settings" /></template>
          下载 CI 构建
        </FluentButton>
      </div>
    </div>
    <div v-else-if="isError" class="flex-column mt-12 ">
      <div class="page-margin-x">
        <h2 class="align-self-center text-center mb-6 text-h3 font-weight-bold fluent-title">Σ(っ °Д °;)っ</h2>
        <h2 class="align-self-center text-center mb-6 text-h4 font-weight-bold fluent-title">出错啦！</h2>
        <p class="text-center align-self-center mb-16 fluent-description">无法获取下载信息，可能是下载服务器目前不可用。</p>

        <div class="justify-center d-flex flex-row flex-wrap ga-4">
          <FluentButton variant="primary" @click="refreshPage">
            <template #prepend><FluentSystemIcon name="arrowClockwise" /></template>
            刷新页面
          </FluentButton>
          <FluentButton href="https://github.com/ClassIsland/ClassIsland/releases" target="_blank">
            <template #prepend><FluentSystemIcon name="github" /></template>
            前往 GitHub 下载
          </FluentButton>
        </div>
      </div>
    </div>

    <FluentDialog v-model="isDialogActive" title="完整版 vs 精简版">
      <div class="fluent-dialog-body">
        精简版与完整版相比，移除了不必要的资源文件（字体、文档等）以缩小应用体积，同时功能保持不变。您可以根据需要选择要使用的版本。
      </div>
      <template #footer>
        <FluentButton @click="isDialogActive = false">关闭</FluentButton>
      </template>
    </FluentDialog>
  </div>
</template>

<style scoped lang="scss">
.loading-mask {
  align-self: center;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.download-container {
  height: 100%;
}

.platform {
  flex-basis: 33.3333%;
  position: relative;
  z-index: 1;
}

.platform:hover {
  z-index: 10;
}

.fluent-title {
  font-family: var(--font-family-base);
  color: var(--fill-color-text-primary);
}

.fluent-subtitle {
  font-family: var(--font-family-base);
  color: var(--fill-color-text-secondary);
}

.fluent-description {
  font-family: var(--font-family-base);
  color: var(--fill-color-text-secondary);
}

.fluent-dialog-body {
  font-family: var(--font-family-base);
  font-size: 14px;
  line-height: 20px;
  color: var(--fill-color-text-primary);
}
</style>
