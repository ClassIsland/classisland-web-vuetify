<script setup lang="ts">
import {onMounted, ref, computed} from "vue";
import DownloadPlatformCard from "../../../components/DownloadPlatformCard.vue";
import "../../../utils/tracedFetch";
import { useHead } from '@unhead/vue'
import SplitDownloadButton from '../../../components/SplitDownloadButton.vue';
import tracedFetch from '../../../utils/tracedFetch';
import FluentButton from '../../../components/fluent/FluentButton.vue';
import FluentSegmentedControl from '../../../components/fluent/FluentSegmentedControl.vue';
import FluentComboBox from '../../../components/fluent/FluentComboBox.vue';
import FluentDialog from '../../../components/fluent/FluentDialog.vue';
import FluentCard from '../../../components/fluent/FluentCard.vue';
import FluentSystemIcon from '../../../components/FluentSystemIcon.vue';

const isLoading = ref(true);
const downloadIndex = ref<any>({ channels: {} });
const latestVersionInfo = ref({
  latestVersion: "",
  latestVersionId: "",
});

const channels = ref<any[]>([]);
const selectedChannel = ref("");
const defaultChannel = ref("");
const isDialogActive = ref(false);
const isError = ref(false);

const currentOs = ref("windows-10");
const currentArch = ref("x64");
const downloadInfosPortable = {
  windows: {
    "windows_x64_selfContained_folder": {
      title: "含运行时 x64 .zip"
    },
    // "windows_x86_selfContained_folder": {
    //   title: "含运行时 x86 .zip"
    // },
    "windows_arm64_selfContained_folder": {
      title: "含运行时 ARM64 .zip"
    },
    "windows_x64_full_folder": {
      title: "依赖框架 x64 .zip"
    },
    // "windows_x86_full_folder": {
    //   title: "依赖框架 x86 .zip"
    // },
    "windows_arm64_full_folder": {
      title: "依赖框架 ARM64 .zip"
    }
  },
  macOS: {
  },
  linux: {
    "linux_x64_selfContained_folder": {
      title: "含运行时 x64 .zip"
    },
    "linux_arm64_selfContained_folder": {
      title: "含运行时 ARM64 .zip"
    },
  },
}
const downloadInfosInstaller = {
  windows: {
    "windows_x64_selfContained_installer": {
      title: "含运行时 x64 .exe"
    },
    "windows_x86_selfContained_installer": {
      title: "含运行时 x86 .exe"
    },
    "windows_arm64_selfContained_installer": {
      title: "含运行时 ARM64 .exe"
    }
  },
  macOS: {
    "macos_x64_selfContained_pkg": {
      title: "含运行时 Intel .pkg"
    },
    "macos_arm64_selfContained_pkg": {
      title: "含运行时 Apple Silicon .pkg"
    }
  },
  linux: {
    "linux_x64_selfContained_deb": {
      title: "含运行时 x64 .deb"
    },
    "linux_arm64_selfContained_deb": {
      title: "含运行时 ARM64 .deb"
    },
  },
}
const selectedPlatform = ref("");
const selectedDownloadInfoIds = ref({
  windowsPortable: "windows_x64_full_folder",
  windowsInstaller: "windows_x64_selfContained_installer",
  macOSInstaller: "macos_arm64_selfContained_pkg",
  linuxPortable: "linux_x64_selfContained_folder",
  linuxInstaller: "linux_x64_selfContained_deb",
});
const isChannelChangingDialogOpen = ref(false);

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

  // 检测 ARM 架构
  if (/\b(arm|aarch64)\b/.test(ua)) return 'arm64';

  // 检测 x86-64 架构
  if (/\b(x64|x86_64|win64|amd64|wow64)\b/.test(ua)) return 'x64';

  // 检测 x86 架构
  if (/\b(x86|i686|win32)\b/.test(ua)) return 'x86';


  // 移动设备默认 ARM
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

async function init(){
  try{
    const result = await tracedFetch( "https://distribution.classisland.tech/api/v1/public/distributions/web");
    const { code, content, message } = await result.json();
    downloadIndex.value = content;

    for (let i in content.channels) {
      let channel = content.channels[i];
      channel.id = i;
      channels.value.push({
        id: i,
        title: i,
        props: {
          title: channel.channelName,
          subtitle: channel.channelDescription,
        }
      });
    }
    // selectedChannel.value = json.Channels.stable;
    selectedChannel.value = content.defaultChannel;
    defaultChannel.value = content.defaultChannel;

    await loadCurrentChannel();
  } catch (e) {
    isError.value = true;
    console.error(e);
  }
  isLoading.value = false;
}

async function getSelectedVersion(index: any) {
  return downloadIndex.value.channels[selectedChannel.value];
}

async function loadCurrentChannel() {
  console.log("当前通道：", selectedChannel.value);
  if (downloadIndex.value && downloadIndex.value.channels && selectedChannel.value) {
    latestVersionInfo.value = await getSelectedVersion(downloadIndex.value);
  }
}

async function updateChannelSelection() {
  if (selectedChannel.value != defaultChannel.value) {
    isChannelChangingDialogOpen.value = true;
  }
  await loadCurrentChannel();
}

function showHelpDialog() {
  isDialogActive.value = true;
}

function refreshPage() {
  location.reload();
}

onMounted(() => init());

const segmentedControlItems = computed(() => {
  return channels.value.map(c => ({
    label: c.props.title,
    subtitle: c.props.subtitle,
    version: downloadIndex.value.channels?.[c.id]?.latestVersion ?? '',
    value: c.id
  }));
});

const comboBoxItems = computed(() => {
  return channels.value.map(c => ({
    text: c.props.title,
    value: c.id
  }));
});

</script>

<template>
  <div class="d-flex download-container flex-column page-margin-x-wide">
    <div v-if="!isError" class="d-flex flex-column mt-8">
      <h2 class="align-self-center text-center mb-4 text-h3 font-weight-bold fluent-title">下载 ClassIsland</h2>
      <p class="text-center align-self-center mb-12 fluent-subtitle">首先，选择适合您的平台和打包方式</p>

      <div class="mb-2 align-self-center d-none d-md-block ">
        <v-skeleton-loader v-if="isLoading" width="408px" height="40px"
                           rounded="xl"/>
        <FluentSegmentedControl
          v-else
          v-model="selectedChannel"
          :items="segmentedControlItems"
          @update:model-value="updateChannelSelection">
          <template #item="{ item, selected }">
            <div class="channel-segment-item" :class="{ 'channel-segment-item--selected': selected }">
              <span class="channel-segment-item__title">{{ item.label }}</span>
              <span v-if="item.version" class="channel-segment-item__meta">v{{ item.version }}</span>
            </div>
          </template>
        </FluentSegmentedControl>
      </div>

      <div class="align-self-center d-block d-md-none ">
        <v-skeleton-loader v-if="isLoading" class="mb-5" width="273px" height="40px"/>
        <FluentComboBox
          v-else
          v-model="selectedChannel"
          :items="comboBoxItems"
          item-text="text"
          item-value="value"
          placeholder="发行通道"
          class=""
          @update:model-value="updateChannelSelection"
        />
      </div>


      <div class="mb-4 align-self-center d-flex flex-column">
        <v-skeleton-loader v-if="isLoading" width="200px" height="19.5px"/>
        <p v-else
           class="text-center fluent-description"
           style="opacity: 75%; font-size: 13px; ">{{downloadIndex.channels[selectedChannel == "" ? defaultChannel : selectedChannel]?.channelDescription}}</p>
      </div>
      <div class="align-self-stretch d-flex ga-4 justify-center platforms-container flex-column flex-md-row flex-row
                   align-content-start">
        <DownloadPlatformCard platform-name="Windows"
                              platform-icon="windows"
                              description="Windows 10 及更高版本"
                              class="flex-grow-1 platform">
          <div class="d-flex flex-row flex-wrap align-center justify-center mt-2 ga-1">
            <v-skeleton-loader v-if="isLoading" width="138.65px" height="48px"/>
            <SplitDownloadButton v-else
                                 variant="primary"
                                 :download-infos="downloadInfosPortable.windows"
                                 title="下载便携版"
                                 :is-selected='selectedPlatform === "windows10"'
                                 :selectedDownloadInfo="selectedDownloadInfoIds.windowsPortable"
                                 :download-route-root='"/download/thank_you/v2/" + latestVersionInfo.latestVersionId + "/"'/>
<!--            <SplitDownloadButton :download-infos="downloadInfosInstaller.windows"-->
<!--                                 title="下载安装版"-->
<!--                                 :is-selected='selectedPlatform === "windows10"'-->
<!--                                 :selectedDownloadInfo="selectedDownloadInfoIds.windowsInstaller"-->
<!--                                 :download-route-root='"/download/thank_you/v2/" + latestVersionInfo.latestVersionId + "/"'/>-->
          </div>

        </DownloadPlatformCard>
        <DownloadPlatformCard platform-name="Linux"
                              platform-icon="linux"
                              description="Debian 10 或其衍生版"
                              class="flex-grow-1 platform"
        >
          <div class="d-flex flex-row flex-wrap align-center justify-center mt-2 ga-1">
            <v-skeleton-loader v-if="isLoading" width="138.65px" height="48px"/>
            <SplitDownloadButton v-else
                                 :download-infos="downloadInfosPortable.linux"
                                 title="下载便携版"
                                 variant="primary"
                                 :is-selected='selectedPlatform === "linux"'
                                 :selectedDownloadInfo="selectedDownloadInfoIds.linuxPortable"
                                 :download-route-root='"/download/thank_you/v2/" + latestVersionInfo.latestVersionId + "/"'/>
            <v-skeleton-loader v-if="isLoading" width="138.65px" height="48px"/>
            <SplitDownloadButton v-else
                                 :download-infos="downloadInfosInstaller.linux"
                                 title="下载安装版"
                                 variant="primary"
                                 :is-selected='selectedPlatform === "linux"'
                                 :selectedDownloadInfo="selectedDownloadInfoIds.linuxInstaller"
                                 :download-route-root='"/download/thank_you/v2/" + latestVersionInfo.latestVersionId + "/"'/>
          </div>
        </DownloadPlatformCard>
        <DownloadPlatformCard platform-name="Mac"
                              platform-icon="macos"
                              description="MacOS Big Sur 11 及更高版本"
                              class="flex-grow-1 platform">
          <div class="d-flex flex-row flex-wrap align-center justify-center mt-2">
            <v-skeleton-loader v-if="isLoading" width="190.25px" height="48px"/>
            <SplitDownloadButton v-else
                                 :download-infos="downloadInfosInstaller.macOS"
                                 title="下载安装版"
                                 variant="primary"
                                 :is-selected='selectedPlatform === "macOS"'
                                 :selectedDownloadInfo="selectedDownloadInfoIds.macOSInstaller"
                                 :download-route-root='"/download/thank_you/v2/" + latestVersionInfo.latestVersionId + "/"'/>
          </div>
        </DownloadPlatformCard>

      </div>

      <div class="my-4">
        <div class="d-flex flex-row flex-wrap ga-4 justify-center align-self-center align-content-center">
          <FluentButton variant="hyperlink"
                 href="https://github.com/ClassIsland/ClassIsland/releases/"
                 target="_blank">
            <template #prepend><FluentSystemIcon name="arrowDownload" /></template>
            查看全部下载
          </FluentButton>
          <FluentButton variant="hyperlink"
                 href="https://github.com/ClassIsland/ClassIsland/actions/workflows/build_release.yml"
                 target="_blank">
            <template #prepend><FluentSystemIcon name="settings" /></template>
            下载 CI 构建
          </FluentButton>
          <FluentButton variant="hyperlink"
                 to="/download/v1">
            <template #prepend><FluentSystemIcon name="archive" /></template>
            下载 ClassIsland 1
          </FluentButton>
        </div>

      </div>

    </div>
    <div v-else-if="isError" class="flex-column mt-12 ">
      <div class="page-margin-x">
        <h2 class="align-self-center text-center mb-6 text-h3 font-weight-bold fluent-title">Σ(っ °Д °;) っ</h2>
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
}

.download-container {
  height: 100%;
}

.platforms-container {
  flex-grow: 1;
}

.platform {
  flex-basis: 33.3333%;
}

.bottom-operations {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  @media (max-width: 1040px) {
    display: flex;
    flex-direction: column;
    margin-top: 12px;
  }
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

.skeleton-loader {
  background-color: var(--fill-color-control-alt-secondary);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}

.fluent-dialog-body {
  font-family: var(--font-family-base);
  font-size: 14px;
  line-height: 20px;
  color: var(--fill-color-text-primary);
}

.channel-segment-item {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  line-height: 1.2;
  gap: 4px;
}

.channel-segment-item__title {
  white-space: nowrap;
}

.channel-segment-item__meta {
  margin-top: 2px;
  font-size: 11px;
  opacity: 0.75;
  white-space: nowrap;
}

.channel-segment-item--selected .channel-segment-item__meta {
  opacity: 0.95;
}
</style>
