<template>
  <v-app-bar class="pr-4">
    <v-app-bar-title class="align-content-center"> ClassIsland </v-app-bar-title>

    <template v-slot:append>
      <div class="ga-4">
        <v-btn href="https://migrate.classisland.tech/"> 迁移到 ClassIsland </v-btn>
        <v-btn href="https://docs.classisland.tech/"> 文档 </v-btn>
        <v-btn href="https://github.com/ClassIsland/ClassIsland"> GitHub 仓库 </v-btn>
        <v-btn small variant="flat" color="primary">立即下载</v-btn>
      </div>
    </template>
  </v-app-bar>

  <!-- 主要介绍 -->
  <div class="position-relative" style="height: 100vh">
    <v-parallax
      src="../assets/screenshots/desktop.png"
      class="position-absolute"
      style="height: 100vh; width: 100vw; filter: blur(8px); opacity: 0.1"
    />
    <div class="introduction position-absolute">
      <div class="description-container">
        <div class="app-logo">
          <img src="../assets/logo.svg" height="96" width="96" />
        </div>
        <h1>ClassIsland</h1>
        <p>一款适用于班级多媒体屏幕的课表的信息显示工具，可以一目了然地显示各种信息。</p>
        <div class="badages">
          <a href="https://github.com/ClassIsland/ClassIsland">
            <img src="https://img.shields.io/github/stars/ClassIsland/ClassIsland" alt="Stars" />
          </a>
          <a>
            <img
              src="https://img.shields.io/github/license/HelloWRC/ClassIsland?style=flat-square"
              alt="开源许可证"
            />
          </a>
        </div>
        <div class="d-flex ga-4">
          <v-btn flat large color="primary" prepend-icon="mdi-download" onclick="">
            立即下载
          </v-btn>
          <v-btn
            flat
            prepend-icon="mdi-github"
            href="https://github.com/ClassIsland/ClassIsland"
            onclick=""
          >
            GitHub 仓库
          </v-btn>
        </div>
      </div>
      <div class="introduction-demo-container">
        <div class="position-absolute desktop-img">
          <img src="../assets/screenshots/desktop.png" style="height: 75vh; margin-top: 10vb" />
        </div>
      </div>
    </div>
  </div>

  <v-sheet>
    <div class="content d-flex flex-1-1">
      <div class="d-flex flex-column ga-4 mr-4">
        <h2>丰富的信息显示功能</h2>
        <p>ClassIsland 具有丰富的信息展示功能，各种信息一目了然。</p>
        <v-card
          title="显示当日的课表"
          variant="tonal"
          prepend-icon="mdi-table"
          text="ClassIsland 可以根据规则自动显示当天的课表，支持单双周轮换。"
        />
        <v-card
          title="课程详细信息"
          variant="tonal"
          prepend-icon="mdi-text"
          text="ClassIsland 可以根据设置，展开显示当前课程的详细信息，如课程时间，下课计时等。"
        />
        <v-card
          title="快速信息"
          variant="tonal"
          prepend-icon="mdi-card-text-outline"
          text="除了课程信息，ClassIsland还可以显示如天气、考试倒计时等快速信息。"
        />
      </div>
      <div class="ml-4">
        <div class="app-showcases-wrapper d-flex flex-column ga-16">
          <img src="../assets/mainwindow-dark.png" class="app-showcase" />
          <img src="../assets/mainwindow2-dark.png" class="app-showcase" />
          <img src="../assets/mainwindow3-dark.png" class="app-showcase" />
        </div>
      </div>
    </div>
  </v-sheet>

  <div>
    <div class="content d-flex flex-1-1 align-content-center">
      <div class="flex-grow-1 mr-4 align-self-center" style="flex-basis: 0; width: 100%">
        <v-carousel show-arrows="hover" cycle height="min-content" hide-delimiter-background>
          <v-carousel-item>
            <img
              src="../assets/screenshots/311477098-29d91bf2-4c8a-4cbd-a778-a9034e7d7420.png"
              width="100%"
            />
          </v-carousel-item>
          <v-carousel-item>
            <img
              src="../assets/screenshots/311477113-2b3b5c87-c8bb-46f0-8470-01edf3ca52a2.png"
              width="100%"
            />
          </v-carousel-item>
          <v-carousel-item>
            <img
              src="../assets/screenshots/311477126-a2e64983-dfa0-4565-a45a-31c9f9c298a8.png"
              width="100%"
            />
          </v-carousel-item>
        </v-carousel>
      </div>
      <div class="d-flex flex-column ga-4 flex-grow-1 ml-4" style="flex-basis: 0">
        <h2>强大的课表管理系统</h2>
        <p>ClassIsland 的具有强大的课表管理系统，可以便捷地导入、编辑和调换课表。</p>
        <div class="d-flex flex-column ga-4">
          <v-card
            title=" 简洁直观的课表编辑工具"
            variant="tonal"
            prepend-icon="mdi-file-document-edit-outline"
            text="ClassIsland 具有简洁直观的课表编辑工具，可以便利地编辑课表、时间表和科目等信息。"
            class="flex-grow-1"
          >
          </v-card>
          <v-card
            title="课表导入"
            variant="tonal"
            prepend-icon="mdi-file-import-outline"
            class="flex-grow-1"
          >
            <v-card-text>
              ClassIsland
              可以从学校发布的电子版课表表格文件中导入课表和时间表信息。除此之外，ClassIsland
              也支持<a href="https://migrate.classisland.tech/">从其它课表软件导入课表信息</a>。
            </v-card-text>
          </v-card>
          <v-card
            title="换课与临时课表"
            variant="tonal"
            prepend-icon="mdi-swap-horizontal"
            class="flex-grow-1"
          >
            <v-card-text>
              ClassIsland 支持调换当天的课程，同时也支持临时启用某个课表。
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>

    <v-sheet>
      <div class="content d-flex flex-1-1">
        <div class="d-flex flex-column ga-4 flex-grow-1 mr-4" style="flex-basis: 0">
          <h2>提醒</h2>
          <p>
            ClassIsland
            可以在上课、下课等重要时间点发出提醒。除此之外，ClassIsland支持使用一系列方法强调提醒效果。
          </p>
          <div class="content-flex-layout ga-4">
            <template v-for="feature in notificationFeatures" :key="feature.title">
              <v-card variant="outlined" color="primary">
                <v-card-item>
                  <v-icon :icon="feature.icon" />
                </v-card-item>
                <v-card-title>{{ feature.title }}</v-card-title>
                <v-tooltip activator="parent" location="top">{{ feature.description }}</v-tooltip>
              </v-card>
            </template>
          </div>
        </div>
        <div class="flex-grow-1 d-flex ml-4" style="flex-basis: 0">
          <div class="position-relative">
            <video
              src="../assets/notification-demo.mp4"
              muted
              autoplay
              loop
              width="100%"
              id="notification-demo"
            />
            <div class="position-absolute" style="bottom: 16px; left: 8px">
              <v-fade-transition>
                <v-btn
                  variant="elevated"
                  color="primary"
                  icon="mdi-volume-off"
                  id="button_unmute"
                  title="取消静音"
                  @click="unmute_video"
                  v-show="!isVideoSoundRestored"
                >
                  <v-icon>mdi-volume-off</v-icon>
                  <v-tooltip activator="parent" location="start"> 解除静音 </v-tooltip>
                </v-btn>
              </v-fade-transition>
            </div>
          </div>
        </div>
      </div>
    </v-sheet>
    <div class="">
      <div class="content d-flex flex-column ga-8">
        <span class="text-h5 align-self-center">更多功能留给您自行探索！</span>
        <div class="d-flex flex-row ga-2 align-self-center">
          <v-btn flat color="primary" prepend-icon="mdi-download" onclick="">
            立即下载 ClassIsland
          </v-btn>
          <v-btn
            flat
            prepend-icon="mdi-github"
            href="https://github.com/ClassIsland/ClassIsland"
            onclick=""
          >
            了解更多
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-showcases-wrapper {
  position: absolute;
  z-index: 99;
  left: 60vw;
  margin-top: 96px;
  align-self: stretch;
}

.app-showcase {
  height: 50px;
  align-self: start;
  overflow-clip-margin: content-box;
  overflow: clip;
  transition: all 0.8s cubic-bezier(0.08, 0.82, 0.17, 1) 0.1s;
}

.app-showcase:hover {
  transform: translateX(-10vw);
}

h1 {
  font-size: 64px;
  font-weight: 500;
}

.content-flex-layout {
  display: flex;
  * {
    flex-grow: 1;
    flex-basis: 0;
  }
}

.content {
  padding-top: 32px;
  padding-bottom: 32px;
  margin-left: 20vb;
  margin-right: 20vb;
  flex-basis: 0;
}

.badages {
  > * {
    margin-right: 6px;
  }
}

.introduction {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;

  .description-container {
    margin-left: 10%;
    margin-top: 20vb;
    flex-grow: 0.5;

    > * {
      margin-top: 8px;
    }
  }

  .introduction-demo-container {
    flex-grow: 0.5;
  }
}

.desktop-img {
  transition: all 0.8s cubic-bezier(0.08, 0.82, 0.17, 1) 0.1s;
}

.desktop-img:hover {
  transform: translateX(-18vw);
}
</style>

<script lang="ts" setup>
import IFeature from '../interfaces/IFeature';
import { ref } from 'vue';

function unmute_video(event: Event) {
  const video = document.getElementById('notification-demo') as HTMLVideoElement;
  isVideoSoundRestored.value = true;
  video.muted = false;
}

const isVideoSoundRestored = ref(false);

const notificationFeatures: Array<IFeature> = [
  {
    title: '横幅',
    icon: 'mdi-forum',
    description: '屏幕上方横幅显示'
  },
  {
    title: '全屏特效',
    icon: 'mdi-layers',
    description: '炫酷显眼波浪特效'
  },
  {
    title: '语音播报',
    icon: 'mdi-account-voice',
    description: '支持离线的系统TTS和联网EdgeTTS'
  },
  {
    title: '音效',
    icon: 'mdi-volume-high',
    description: '清新提醒音效，还可以自定义哦'
  }
];
</script>
