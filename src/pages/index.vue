<template>
  <!-- 主要介绍 -->
  <div class="introduction-container">
    <div class="introduction d-flex flex-column margin-x " style="z-index: 1">
      <div class="introduction-col description">
        <div class="brand-home">
          <h1 class="brand-title">ClassIsland</h1>
        </div>
        <div class="feature-main">
          <span>一款</span>
          <span class="feature-pill " >
            <span v-for="i in featureTags" v-bind:key="i.title"
                  :class='`gradient-base feature-pill-item ${i.selected ? "selected-pill" : ""}`'
                  :style='`background-image: linear-gradient(135deg, ${i.gradientStart}, ${i.gradientEnd});`'>{{ i.title }}</span>
          </span>
          <br/>
          <span>的大屏课表工具</span>
        </div>
        <div class="d-flex ga-2 flex-wrap mt-8">
          <a href="https://github.com/ClassIsland/ClassIsland">
            <img src="https://img.shields.io/github/stars/ClassIsland/ClassIsland" alt="Stars">
          </a>
          <a>
            <img src="https://img.shields.io/github/license/HelloWRC/ClassIsland?style=flat-square" alt="开源许可证">
          </a>
        </div>
        <div class="d-flex ga-2 flex-wrap mt-2">
          <v-btn to="/download" color="blue-lighten-3" prepend-icon="mdi-download" size="large">立即下载</v-btn>
          <v-btn href="https://github.com/ClassIsland/ClassIsland"
                 color="blue-lighten-3" variant="text"
                 target="_blank" prepend-icon="mdi-github" size="large">GitHub 仓库</v-btn>
        </div>
      </div>
    </div>
  </div>

  <v-sheet class="content">
    <h2 class="headline-feature text-center" >
          <span class="gradient-base"
                style="background-image: linear-gradient(135deg, #00FFED, #00bdfd)">直观</span>
      <span>的信息显示</span></h2>
    <div class="d-flex flex-1-1 flex-wrap margin-x flex-wrap">
      <div class="d-flex flex-column ga-4 mr-4">
        <h3 class="text-h5">组件</h3>
        <p>您可以通过【组件】自定义界面上显示的内容，并且支持组件轮播和多行组件，各种信息一目了然。</p>

      </div>
      <div class="ml-4">

      </div>
    </div>

    <div class="mt-16 d-flex flex-1-1 margin-x ga-8 flex-wrap-reverse">
      <div class="flex-grow-1 d-flex" style="flex-basis: 375px">
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
                color="blue-lighten-3"
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

      <div class="d-flex flex-column ga-4 flex-grow-1" style="flex-basis: 375px  ">
        <h3 class="text-h5">醒目的提醒系统</h3>
        <p>
          ClassIsland
          可以在上课、下课等重要时间点发出提醒。除此之外，ClassIsland支持使用一系列方法强调提醒效果。
        </p>
        <div class="content-flex-layout ga-4 flex-wrap">
          <template v-for="feature in notificationFeatures" :key="feature.title" >
            <v-card variant="outlined" color="blue-lighten-3">
              <v-card-item>
                <v-icon :icon="feature.icon" />
              </v-card-item>
              <v-card-title>{{ feature.title }}</v-card-title>
              <v-tooltip activator="parent" location="top">{{ feature.description }}</v-tooltip>
            </v-card>
          </template>
        </div>
      </div>
    </div>

  </v-sheet>

  <div class="content">
    <h2 class="headline-feature text-center" >
          <span class="gradient-base"
                style="background-image: linear-gradient(135deg, #00FFC9, #82FF8F)">灵活</span>
      <span>的课表管理</span></h2>
    <div class="d-flex flex-1-1 align-content-center margin-x flex-wrap ga-8">
      <div class="d-flex flex-column ga-4 flex-grow-1 flex-wrap" style="flex-basis: 375px">
        <h3 class="text-h5">强大的课表系统</h3>
        <p>ClassIsland 的具有强大的课表管理系统，可以便捷地导入、编辑和调换课表。</p>
        <div class="d-flex flex-column ga-4" >
          <v-card
            title=" 简洁直观的课表编辑工具"
            variant="outlined"
            prepend-icon="mdi-file-document-edit-outline"
            text="ClassIsland 具有简洁直观的课表编辑工具，可以便利地编辑课表、时间表和科目等信息。"
            class="flex-grow-1"
          >
          </v-card>
          <v-card
            title="课表导入"
            variant="outlined"
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
            variant="outlined"
            prepend-icon="mdi-swap-horizontal"
            class="flex-grow-1"
          >
            <v-card-text>
              ClassIsland 支持调换当天的课程，同时也支持临时启用某个课表。
            </v-card-text>
          </v-card>
        </div>
      </div>
      <div class="flex-grow-1 align-self-center" style="flex-basis: 375px; width: 100%">
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
    </div>

    <v-sheet>
    </v-sheet>
    <div class="">
      <div class="content d-flex flex-column ga-8 margin-x">
        <span class="text-h5 align-self-center">更多功能留给您自行探索！</span>
        <div class="d-flex flex-row ga-2 align-self-center">
          <v-btn flat color="blue-lighten-3" prepend-icon="mdi-download" @click="gotoDownload">
            立即下载 ClassIsland
          </v-btn>
          <v-btn flat prepend-icon="mdi-github" href="https://github.com/ClassIsland/ClassIsland">
            了解更多
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  padding-top: 36px;
  padding-bottom: 32px;

}

.margin-x {
  margin: 0 42px;
  @media (max-width: 600px) {
    margin: 0 12px
  }

  max-width: 1200px;
  @media (min-width: 1284px) {
    width: 1200px;
    justify-self: center;
  }
}

.introduction {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;

  @media (max-width: 1000px) {
    .img-col {
      display: none;
    }
  }

  .img-col {
    flex-basis: 0;
    flex-shrink: 1;
    margin-right: -200px;
  }
  .description{
    margin-top: 10vh;
  }

  @media (min-width: 1000px) {
    .img-position-absolute {
      position: absolute;
    }
    .desktop-img {
      transition: all 0.8s cubic-bezier(0.08, 0.82, 0.17, 1) 0.1s;
      height: 75vh;
      margin-top: 10vh;
      margin-right: -30vw;
    }

    .desktop-img:hover {
      transform: translateX(-15vw);
    }

  }

}

.brand-home {
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 60px;
  }
}

.app-logo {
  width: 96px;
  height: 96px;

}

.introduction-col {
  min-width: 400px;
  flex-basis: 480px;
}

.brand-title {
  font-size: 52px;

  @media (max-width: 675px) {
    font-size: 42px;
  }
}

.feature-pill-item {

  -webkit-animation-delay: 0s, 2s;
  animation-delay: 0s, 2s;
  -webkit-animation-duration: 300ms;
  animation-duration: 300ms;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
  display: none;
  white-space: nowrap;
  align-self: center;
}

.selected-pill {
  -webkit-animation-name: labelSlideIn, labelSlideOut;
  animation-name: labelSlideIn, labelSlideOut;
  display: -ms-inline-flexbox;
  display: inline-flex;
  align-self: center;
}

.headline-feature {
  font-size: 42px;
  font-weight: 600;
  margin-bottom: 16px;
}

@keyframes labelSlideOut {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 100%;
  }

  100% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
    opacity: 0;

  }
}

@keyframes labelSlideIn {
  0% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
    opacity: 0;
  }

  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 100%;
  }
}

.feature-pill {
  font-size: 42px;
  font-weight: bold;

}

.feature-main {
  font-size: 42px;
  line-height: 54px;
  font-weight: bold;
}

.introduction-container {
  background-image: linear-gradient(135deg, #26c4ce11, #00000000, #00000000, #00000000), url("../assets/Banner-Web-24.png");
  background-position: right;
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-clip: content-box;
  @media (max-width: 1200px) {
    background-image: linear-gradient(135deg, #26c4ce11, #00000000, #00000000, #00000000), url("../assets/Banner-Web-24-b.png");
  }
  @media (max-width: 1000px) {
    background-image: linear-gradient(135deg, #26c4ce11, #00000000, #00000000, #00000000);
  }
}

.gradient-base {
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>

<script lang="ts" setup>
import IFeature from '../interfaces/IFeature';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function unmute_video(event: Event) {
  const video = document.getElementById('notification-demo') as HTMLVideoElement;
  isVideoSoundRestored.value = true;
  video.muted = false;
}

function gotoDownload() {
  router.push("/download");
}

const isVideoSoundRestored = ref(false);

const featureTags = ref([
  {
    selected: true,
    title: "直观",
    gradientStart: "#00FFED",
    gradientEnd: "#00bdfd",
  },
  {
    selected: false,
    title: "灵活",
    gradientStart: "#00FFC9",
    gradientEnd: "#82FF8F",
  },
  {
    selected: false,
    title: "智能",
    gradientStart: "#C93BFF",
    gradientEnd: "#8B3BFF",
  },
  {
    selected: false,
    title: "可定制",
    gradientStart: "#FCF33A",
    gradientEnd: "#FFDD3B",
  },
  {
    selected: false,
    title: "可靠",
    gradientStart: "#FF7900",
    gradientEnd: "#FFA100",
  }
]);

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
    description: '支持离线的系统 TTS、EdgeTTS 和 GPT-SoVITS'
  },
  {
    title: '音效',
    icon: 'mdi-volume-high',
    description: '清新提醒音效，还可以自定义哦'
  }
];

onMounted(() => {
  // checkNewYearAlert();
});

setInterval(() =>{
  console.log(featureTags);
  let ft = featureTags.value;
  let b = false;
  for (let i in ft) {
    if (b == true) {
      b = false;
      ft[i].selected = true;
      break;
    }

    if (ft[i].selected) {
      b = true;
      ft[i].selected = false;
    }
  }
  if (b) {
    ft[0].selected = true;
  }
  featureTags.value = ft;
}, 2250);

</script>
