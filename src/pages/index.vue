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
        <div class="d-flex ga-4 flex-wrap mt-2">
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
    <div class="margin-x ga-4">
      <h3 class="text-h5">组件</h3>
      <p class="mt-4">您可以通过【组件】自定义界面上显示的内容，并且支持组件轮播和多行组件。课表组件支持显示当天的课表和当前进行课程的信息。各种信息一目了然。</p>
      <div class="d-flex flex-column align-content-center ">
        <v-img class="mt-8 mx-auto" src="../assets/screenshots/comps.png" width="100%" max-width="900px"/>
        <v-img src="../assets/screenshots/comp-settings.png" width="100%"  max-width="60%" class="justify-center mx-auto mt-4"/>
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
          <div class="position-absolute" style="bottom: 16px; right: 8px">
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
                <v-tooltip activator="parent" location="end"> 解除静音 </v-tooltip>
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
        <p>ClassIsland 具有强大的课表管理系统，可以便捷地导入、编辑和调换课表。</p>
        <div class="d-flex flex-column ga-4" >
          <v-card
            title="灵活的课表启用规则"
            variant="flat"
            prepend-icon="mdi-tag-multiple-outline"
            text="ClassIsland 支持为课表设置多周（最高 4 周）轮换启用规则，也支持使用【课表群】分批启用课表。"
            class="flex-grow-1"
          >
          </v-card>
          <v-card
            title="课表导入"
            variant="flat"
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
            title=" 简洁直观的课表编辑工具"
            variant="flat"
            prepend-icon="mdi-file-document-edit-outline"
            text="ClassIsland 具有简洁直观的课表编辑工具，可以便利地编辑课表、时间表和科目等信息。"
            class="flex-grow-1"
          >
          </v-card>
        </div>
      </div>
      <div class="flex-grow-1 align-self-center" style="flex-basis: 375px; width: 100%">
        <v-carousel show-arrows="hover" cycle height="min-content" hide-delimiter-background>
          <v-carousel-item>
            <img
              src="../assets/screenshots/1.png"
              width="100%"
            />
          </v-carousel-item>
          <v-carousel-item>
            <img
              src="../assets/screenshots/2.png"
              width="100%"
            />
          </v-carousel-item>
          <v-carousel-item>
            <img
              src="../assets/screenshots/3.png"
              width="100%"
            />
          </v-carousel-item>
          <v-carousel-item>
            <img
              src="../assets/screenshots/4.png"
              width="100%"
            />
          </v-carousel-item>
        </v-carousel>
      </div>
    </div>

    <div class="d-flex flex-1-1 align-content-start margin-x flex-wrap ga-8 mt-12">
      <div class="flex-grow-1 " style="flex-basis: 375px">
        <h3 class="text-h5 mb-2">换课</h3>
        <p  class="mb-4">ClassIsland 支持当日和跨天换课，灵活应对调课情景。</p>
        <v-img src="../assets/screenshots/5.png"/>
      </div>
      <div class="flex-grow-1 align-self-center" style="flex-basis: 375px; width: 100%">
        <h3 class="text-h5 mb-2">提前预定课表</h3>
        <p class="mb-4">ClassIsland 也支持提前预定要启用的课表，提前安排调休课表。</p>
        <v-img src="../assets/screenshots/6.png" />
      </div>
    </div>


  </div>

  <v-sheet class="content">
    <h2 class="headline-feature text-center" >
          <span class="gradient-base"
                style="background-image: linear-gradient(135deg, #C93BFF, #8B3BFF)">智能</span>
      <span>的自动行为</span></h2>

    <div class="d-flex flex-1-1 align-content-center margin-x flex-wrap ga-8 flex-wrap-reverse">
      <div class="flex-grow-1 align-self-center" style="flex-basis: 375px; width: 100%">
        <v-img src="../assets/screenshots/ruleset.png"/>
      </div>
      <div class="d-flex flex-column ga-4 flex-grow-1 flex-wrap" style="flex-basis: 375px">
        <h3 class="text-h5">规则集</h3>
        <p>ClassIsland 的部分状态可以通过定义自定义的规则实现自动修改，如比如在上课且前台是全屏/最大化窗口时隐藏主界面等。ClassIsland 内置了课程、窗口、天气等规则，同时支持插件扩展规则，灵活应对各种情景。</p>
      </div>
    </div>

    <div class="d-flex flex-1-1 align-content-center margin-x flex-wrap ga-8 mt-16">
      <div class="d-flex flex-column ga-4 flex-grow-1 flex-wrap" style="flex-basis: 375px">
        <h3 class="text-h5">自动化</h3>
        <p>自动化功能可以让 ClassIsland 在一些特定的时间节点执行一些特定的操作，比如切换组件配置，运行程序等，显示提醒等等。总的来说，就是“当 XX 发生”，并且“满足 XX 规则”时“做什么”。</p>
      </div>
      <div class="flex-grow-1 align-self-center" style="flex-basis: 375px; width: 100%">
        <v-img src="../assets/screenshots/automatic1.png"/>
      </div>

    </div>
  </v-sheet>

  <div class="content">
    <h2 class="headline-feature text-center" >
          <span class="gradient-base"
                style="background-image: linear-gradient(135deg, #FCF33A, #FFDD3B)">自由</span>
      <span>的定制能力</span></h2>

    <div class="d-flex flex-1-1 margin-x flex-wrap ga-8 flex-column">
      <div class="d-flex flex-column flex-wrap ga-4 flex-lg-wrap">
        <h3 class="text-h5">插件</h3>
        <p>ClassIsland 支持通过安装插件的方式扩展应用的功能，如添加组件、提醒提供方、自动化行动、规则集规则、认证提供方等等，并且已经形成了相对丰富的插件生态。您可以在应用内的插件市场中安装插件。</p>
        <div class="d-flex ga-2 flex-wrap align-content-start ">
          <PluginCard title="ExtraIsland" author="LiPolymer" url="https://github.com/LiPolymer/ExtraIsland"
                      description="为 ClassIsland 提供多种扩展功能！" icon="https://github.com/LiPolymer/ExtraIsland/raw/master/ExtraIsland/icon.png"/>
          <PluginCard title="ClassIsland 主题加载器" author="ClassIsland" url="https://github.com/ClassIsland/ClassIsland.ThemeLoader/"
                      description="向 ClassIsland 加载自定义的主题，个性化您的界面。" icon="https://github.com/ClassIsland/ClassIsland.ThemeLoader/raw/master/ClassIsland.ThemeLoader/icon.png"/>
          <PluginCard title="地震预警" author="电排骨" url="https://github.com/denglihong2007/EarthquakeWarningForClassIsLand"
                      description="防范于未然，争取宝贵的避险时间" icon="https://github.com/denglihong2007/EarthquakeWarningForClassIsLand/raw/master/EarthquakeWarning/icon.png"/>
          <PluginCard title="UIAccess 提权" author="HelloWRC, Doubx690i" url="https://github.com/HelloWRC/GrantUiAccess"
                      description="本插件可以为 ClassIsland 提升 UIAccess 令牌，使 ClassIsland 可以置顶到全屏 UWP 应用和系统界面上。"/>
        </div>
        <p>同时 ClassIsland 也对插件开放了<a href="https://api.docs.classisland.tech/api/ClassIsland.Core.Abstractions.Services.html"
             target="_blank">丰富的 API</a>，您可以查看<a href="https://docs.classisland.tech/dev" target="_blank">开发文档</a>来了解如何开发插件。</p>
      </div>
    </div>

    <div class="d-flex flex-1-1 align-content-center margin-x flex-wrap-reverse ga-8 mt-16">
      <div class="flex-grow-1 align-self-center" style="flex-basis: 375px; width: 100%">
        <v-img src="../assets/screenshots/themes.png"/>
      </div>
      <div class="d-flex flex-column ga-4 flex-grow-1 flex-wrap-reverse" style="flex-basis: 375px">
        <h3 class="text-h5">主题</h3>
        <p>ClassIsland 支持通过主题功能自定义主界面的外观，甚至完全覆盖原来的主界面样式，高度个性化您的界面。</p>
      </div>

    </div>
  </div>

  <v-sheet class="content">
    <h2 class="headline-feature text-center" >
          <span class="gradient-base"
                style="background-image: linear-gradient(135deg, #FF7900, #FFA100)">可靠</span>
      <span>的运行保障</span></h2>

    <div class="d-flex flex-1-1 align-content-center margin-x flex-wrap ga-8">
      <div class="d-flex flex-column ga-4 flex-grow-1 flex-wrap">
        <p>ClassIsland 在设计时充分考虑了在教学环境下，用户维护应用时间不足的情况。因此 ClassIsland 在开发时尽可能地提升了应用的可靠性，并添加了一系列提升维护效率的功能，减轻用户维护压力。</p>

        <div class="d-flex ga-4 flex-wrap" >
          <v-card
            title="健壮的程序设计"
            variant="outlined"
            prepend-icon="mdi-xml"
            text="ClassIsland 具有较强的稳定性，尽力减少在运行时发生崩溃错误的概率。同时支持在发生崩溃时自动退出，不影响教学任务。"
            class="feature-card-divided"
          >
          </v-card>
          <v-card
            title="自动时间同步"
            variant="outlined"
            prepend-icon="mdi-clock-check-outline"
            text="ClassIsland 支持自动从公开的 NTP 服务器或学校广播服务器的 NTP 服务同步时间，提高提醒等功能与学校铃声的同步性。同时支持自定义时间偏移和自动调整时间偏移。"
            class="feature-card-divided"
          >
          </v-card>
          <v-card
            title="密码保护"
            variant="outlined"
            prepend-icon="mdi-lock-outline"
            text="ClassIsland 支持为部分功能设置密码，比如编辑应用设置、档案等，减小应用配置被篡改的可能性。"
            class="feature-card-divided"
          >
          </v-card>
          <v-card
            title="集控管理（即将发布）"
            variant="outlined"
            prepend-icon="mdi-briefcase-outline"
            text="ClassIsland 支持通过集控统一下发档案配置、集控策略等，提高管理多个 ClassIsland 实例的便利性。"
            class="feature-card-divided"
          >
          </v-card>
        </div>
      </div>
    </div>
  </v-sheet>

  <div class="">
    <div class="content d-flex flex-column ga-8 margin-x">
      <span class="text-h5 align-self-center">更多功能留给您自行探索！</span>
      <div class="d-flex flex-row ga-2 align-self-center">
        <v-btn flat color="blue-lighten-3" prepend-icon="mdi-download" to="/download">
          立即下载 ClassIsland
        </v-btn>
        <v-btn flat prepend-icon="mdi-github" href="https://github.com/ClassIsland/ClassIsland" target="_blank">
          了解更多
        </v-btn>
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
  padding-top: 42px;
  padding-bottom: 42px;
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

.selected-pill-static {
  display: -ms-inline-flexbox;
  display: inline-flex;
  align-self: center;
}

.headline-feature {
  font-size: 42px;
  font-weight: 600;
  margin-bottom: 20px;
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

.feature-card-divided {
  flex-basis: 480px;
  flex-grow: 1;
}

@keyframes content-in {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<script lang="ts" setup>
import IFeature from '../interfaces/IFeature';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PluginCard from "../components/PluginCard.vue";

import { useHead } from '@unhead/vue'

useHead({
  title: 'ClassIsland - 适用于班级大屏的课表信息显示工具 - 大屏桌面课表',
  meta: [
    {
      name: 'description',
      content: 'ClassIsland 是一款适用于班级大屏的课表信息显示工具，可以一目了然地显示各种信息。',
    },
  ],
})

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
  setInterval(() =>{
    // console.log(featureTags);
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
});

</script>
