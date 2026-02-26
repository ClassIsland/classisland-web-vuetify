<template>
  <!-- 主要介绍 -->
  <div class="introduction-container">
    <div class="introduction-bg intro-bg-enter"/>
    <div class="introduction d-flex flex-column margin-x">
      <div class="introduction-col description">
        <div class="brand-home d-flex flex-row flex-wrap intro-seq" style="--intro-delay: 80ms">
          <img src="../assets/logo.svg" width="42" height="42" alt="App Logo"/>
          <h1 class="brand-title">ClassIsland</h1>
          <p class="brand-description">班级大屏课表</p>
        </div>
        <div class="feature-main mt-6 intro-seq" style="--intro-delay: 130ms">
          你的课表，<span class="cyrene">无限</span>可能
        </div>
        <div class="feature-tags mt-3 intro-seq" style="--intro-delay: 180ms">
          <span class="feature-tags-main">功能强、可定制、跨平台</span>
        </div>
        <div class="d-flex ga-2 flex-wrap mt-3 intro-seq" style="--intro-delay: 230ms">
          <a href="https://github.com/ClassIsland/ClassIsland">
            <img src="https://img.shields.io/github/stars/ClassIsland/ClassIsland" alt="Stars">
          </a>
          <a>
            <img src="https://img.shields.io/github/license/HelloWRC/ClassIsland?style=flat-square" alt="开源许可证">
          </a>
        </div>
        <div class="d-flex ga-4 flex-wrap mt-12 intro-seq" style="--intro-delay: 280ms">
          <FluentButton to="/download" variant="primary" size="large">
            <template #prepend><FluentSystemIcon name="arrowDownload" /></template>
            立即下载
          </FluentButton>
          <FluentButton href="https://github.com/ClassIsland/ClassIsland" variant="hyperlink" target="_blank" size="large">
            <template #prepend><FluentSystemIcon name="github" /></template>
            GitHub 仓库
          </FluentButton>
        </div>
        <p class="mt-4 platform-requirement intro-seq" style="--intro-delay: 330ms">支持在 Windows 10/11、Linux 和 macOS 11及更高版本上运行。</p>
      </div>
    </div>
  </div>

  <div class="content">
    <Subtitle feature-tag="功能强"
              foreground="linear-gradient(135deg, #01FFFD, #00bdfd)"/>

    <div class="margin-x ga-4 d-flex flex-column">
      <FeatureTitle header="直观的信息显示" tag="主界面" color="#01FFFD"/>
      <p class="opacity-75">自动直观地显示今日的课程安排和当前进行的课程等信息，并支持通过【组件】自定义主界面上显示的内容。</p>
      <v-img src="../assets/app-v2/mainwindow.png" height="90px" alt="组件演示图"/>
    </div>

    <div class="mt-16 d-flex flex-1-1 margin-x ga-8 flex-wrap-reverse items-center">
      <div class="flex-grow-1 d-flex" style="flex-basis: 375px">
        <div class="position-relative">
          <video
            src="../assets/app-v2/notification-demo.web.mp4"
            muted
            autoplay
            loop
            width="100%"
            id="notification-demo"
          />
          <div style="position: absolute; bottom: 16px; right: 8px;">
            <transition name="fade">
              <FluentButton
                variant="primary"
                id="button_unmute"
                title="取消静音"
                @click="unmute_video"
                v-show="!isVideoSoundRestored"
              >
                <FluentSystemIcon name="speakerMute" />
              </FluentButton>
            </transition>
          </div>
        </div>
      </div>

      <div class="d-flex flex-column ga-4 flex-grow-1" style="flex-basis: 375px  ">
        <FeatureTitle header="醒目的提醒系统" tag="提醒" color="#01FFFD"/>
        <p class="opacity-75">
          ClassIsland
          可以在上课、下课等重要时间点发出提醒。除此之外，ClassIsland支持使用一系列方法强调提醒效果。
        </p>
        <div class="content-flex-layout ga-4 flex-wrap">
          <template v-for="feature in notificationFeatures" :key="feature.title" >
            <FluentCard :title="feature.title" :text="feature.description" :icon-name="feature.icon">
            </FluentCard>
          </template>
        </div>
      </div>
    </div>

    <div class="d-flex flex-1-1 align-content-center margin-x flex-wrap ga-8 mt-16">
      <div class="d-flex flex-column ga-4 flex-grow-1 flex-wrap" style="flex-basis: 375px">
        <FeatureTitle header="强大的课表系统" tag="课表" color="#01FFFD"/>
        <p class="opacity-75">ClassIsland 具有强大的课表管理系统，可以便捷地导入、编辑和调换课表。</p>
        <div class="d-flex flex-column ga-4" >
          <FluentCard
            title="灵活的课表启用规则"
            icon-name="tagMultiple"
            text="ClassIsland 支持为课表设置多周（最高 9 周）轮换启用规则，也支持使用【课表群】分批启用课表。"
            class="flex-grow-1"
          >
          </FluentCard>
          <FluentCard
            title="时间与科目的自由定制"
            icon-name="arrowUpload"
            class="flex-grow-1"
          >
            <template #default>
              ClassIsland 不仅支持为不同的课表设置不同的时间安排，还支持添加自定义科目。
            </template>
          </FluentCard>
          <FluentCard
            title=" 简洁直观的课表编辑工具"
            icon-name="documentEdit"
            text="ClassIsland 具有简洁直观的课表编辑工具，可以便利地编辑课表、时间表和科目等信息。"
            class="flex-grow-1"
          >
          </FluentCard>
        </div>
      </div>
      <div class="flex-grow-1 align-self-center" style="flex-basis: 375px; width: 100%">
        <FluentFlipView :items="screenshots" />
      </div>
    </div>

    <div class="margin-x mt-16 align-self-stretch d-flex gc-4 gr-8 justify-center platforms-container flex-column flex-md-row flex-row
                   align-content-start items-start">
      <div class="flex-grow-1 d-flex flex-column gap-4 basis-1/3">
        <FeatureTitle header="临时启用课表" tag="临时课表" color="#01FFFD"/>
        <p class="opacity-75">ClassIsland 支持设置在当日或未来某一天临时启用某个课表，以应对调休或换课等场景。</p>
      </div>
      <div class="flex-grow-1 d-flex flex-column gap-4 basis-1/3">
        <FeatureTitle header="提前调整课程" tag="调课" color="#01FFFD"/>
        <p class="opacity-75">ClassIsland 支持当日和跨天换课，灵活应对调课情景。</p>
      </div>
      <div class="flex-grow-1 d-flex flex-column gap-4 basis-1/3">
        <FeatureTitle header="从其它软件导入课表信息" tag="课表导入" color="#01FFFD"/>
        <p class="opacity-75">ClassIsland
          支持从包括但不限于 Class Widgets 1 的其它课表软件直接导入课表信息，也支持从 CSES 导入课表信息。</p>
      </div>
    </div>

    <div class="d-flex flex-1-1 align-content-start margin-x flex-wrap ga-8 mt-12">
      <div class="flex-grow-1 d-flex flex-column gap-4" style="flex-basis: 375px">
        <FeatureTitle header="灵活的规则系统" tag="规则集" color="#01FFFD"/>
        <p class="opacity-75">ClassIsland 的部分状态可以通过定义自定义的规则实现自动修改，如比如在上课且前台是全屏/最大化窗口时隐藏主界面等。ClassIsland 内置了课程、窗口、天气等规则，同时支持插件扩展规则，灵活应对各种情景。</p>
        <img src="../assets/app-v2/rules.webp" style="width: 100%"/>
      </div>
      <div class="flex-grow-1 d-flex flex-column gap-4" style="flex-basis: 375px">
        <FeatureTitle header="智能的自动行为" tag="自动化" color="#01FFFD"/>
        <p class="opacity-75">自动化功能可以让 ClassIsland 在一些特定的时间节点执行一些特定的操作，比如切换组件配置，运行程序等，显示提醒等等。总的来说，就是“当 XX 发生”，并且“满足 XX 规则”时“做什么”。</p>
        <img src="../assets/app-v2/automation.webp" style="width: 100%"/>
      </div>
    </div>
  </div>

  <div class="content">
    <Subtitle feature-tag="可定制"
              foreground="var(--cyrene-gradient)"/>
    <div class="margin-x d-flex flex-column ga-4">
      <FeatureTitle header="使用组件搭配你的主界面" tag="组件" color="#EBA2FD"/>
      <p class="opacity-75">通过【组件】功能自由定制要在主界面显示的内容，并且支持组件轮播和多行组件。除了课表，ClassIsland
        还支持显示天气、倒计时等额外信息，还可以借助插件进一步丰富可显示的信息。</p>
      <div class="components-demo-wrap">
        <img src="../assets/app-v2/ComponentsTutorialBanner.png" class="components-demo" alt="组件演示图"/>
      </div>
    </div>

    <div class="d-flex flex-1-1 align-content-start margin-x flex-wrap ga-8 mt-12">
      <div class="flex-grow-1 d-flex flex-column gap-4" style="flex-basis: 375px">
        <FeatureTitle header="海量的自定义选项" tag="自定义" color="#EBA2FD"/>
        <p class="opacity-75">ClassIsland 提供了丰富的自定义选项，支持自定义主界面内容及外观及其它应用功能。</p>
        <img src="../assets/app-v2/custom.png" style="width: 100%"/>
      </div>
      <div class="flex-grow-1 d-flex flex-column gap-4" style="flex-basis: 375px">
        <FeatureTitle header="自由的主题系统" tag="主题" color="#EBA2FD"/>
        <p class="opacity-75">ClassIsland 支持通过主题功能自定义主界面的外观，甚至完全覆盖原来的主界面样式，高度个性化您的界面。</p>
        <img src="../assets/screenshots/themes.png" style="width: 100%"/>

      </div>
    </div>

    <div class="margin-x mt-16 d-flex flex-column flex-wrap ga-4 flex-lg-wrap">
      <FeatureTitle header="丰富的插件生态" tag="插件" color="#EBA2FD"/>
      <p class="opacity-75">ClassIsland 支持通过安装插件的方式扩展应用的功能，如添加组件、提醒提供方、自动化行动、规则集规则、认证提供方等等，并且已经形成了相对丰富的插件生态。您可以在应用内的插件市场中安装插件。</p>
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
      <p class="opacity-75">同时 ClassIsland 也对插件开放了<a href="https://api.docs.classisland.tech/api/ClassIsland.Core.Abstractions.Services.html"
                                           target="_blank">丰富的 API</a>，您可以查看<a href="https://docs.classisland.tech/dev" target="_blank">开发文档</a>来了解如何开发插件。</p>
    </div>

  </div>
  <div class="content">
    <Subtitle feature-tag="跨平台"
              foreground="linear-gradient(135deg, #ffb802, #ffb802)"/>

    <div class="mt-16 d-flex flex-1-1 margin-x ga-8 flex-wrap-reverse items-center">
      <div class="flex-grow-1 d-flex" style="flex-basis: 375px">
        <div class="position-relative">
          <FluentFlipView :items="screenshotsPlatforms" />
        </div>
      </div>

      <div class="d-flex flex-column ga-4 flex-grow-1" style="flex-basis: 375px  ">
        <FeatureTitle header="优秀的多平台兼容性" tag="多端支持" color="#ffb802"/>
        <p class="opacity-75">
          ClassIsland
          基于 .NET + Avalonia 构建，对主流桌面平台 Windows 10/11、Linux 和 macOS 有良好的支持，并在教学环境常见的 Windows 10 和信创 Linux
          环境上工作良好。
        </p>

      </div>
    </div>

  </div>

  <div class="content">
    <h2 class="headline-feature text-center" >
          除了这些…</h2>

    <div class="d-flex flex-1-1 align-content-center items-center margin-x flex-wrap ga-8 mt-16">
      <div class="d-flex flex-column ga-4 flex-grow-1 flex-wrap" style="flex-basis: 375px">
        <FeatureTitle header="手把手的入门教程" tag="教程" color="#66ccff"/>
        <p class="opacity-75">ClassIsland 内置了完善的入门教程，可以手把手地助您上手应用。</p>
      </div>
      <div class="flex-grow-1 align-self-center" style="flex-basis: 375px; width: 100%">
        <img src="../assets/app-v2/tutorial.webp" style="width: 100%"/>
      </div>
    </div>

    <div class="d-flex flex-1-1 align-content-center margin-x flex-wrap ga-8">
      <div class="d-flex flex-column ga-4 flex-grow-1 flex-wrap">
        <FeatureTitle header="可靠的运行保障" tag="可靠" color="#FF7900"/>
        <p class="opacity-75">ClassIsland 在设计时充分考虑了在教学环境下，用户维护应用时间不足的情况。因此 ClassIsland 在开发时尽可能地提升了应用的可靠性，并添加了一系列提升维护效率的功能，减轻用户维护压力。</p>

        <div class="d-flex ga-4 flex-wrap" >
          <FluentCard
            title="健壮的程序设计"
            icon-name="codeText"
            text="ClassIsland 具有较强的稳定性，尽力减少在运行时发生崩溃错误的概率。同时支持在发生崩溃时自动退出，不影响教学任务。"
            class="feature-card-divided"
          >
          </FluentCard>
          <FluentCard
            title="自动时间同步"
            icon-name="clock"
            text="ClassIsland 支持自动从公开的 NTP 服务器或学校广播服务器的 NTP 服务同步时间，提高提醒等功能与学校铃声的同步性。同时支持自定义时间偏移和自动调整时间偏移。"
            class="feature-card-divided"
          >
          </FluentCard>
          <FluentCard
            title="密码保护"
            icon-name="lockClosed"
            text="ClassIsland 支持为部分功能设置密码，比如编辑应用设置、档案等，减小应用配置被篡改的可能性。"
            class="feature-card-divided"
          >
          </FluentCard>
          <FluentCard
            title="集控管理（即将发布）"
            icon-name="briefcase"
            text="ClassIsland 支持通过集控统一下发档案配置、集控策略等，提高管理多个 ClassIsland 实例的便利性。"
            class="feature-card-divided"
          >
          </FluentCard>
        </div>
      </div>
    </div>
  </div>

  <div class="">
    <div class="content d-flex flex-column ga-8 margin-x">
      <span class="text-h5 align-self-center">更多功能留给您自行探索！</span>
      <div class="d-flex flex-row ga-2 align-self-center">
        <FluentButton variant="primary" to="/download">
          <template #prepend><FluentSystemIcon name="arrowDownload" /></template>
          立即下载 ClassIsland
        </FluentButton>
        <FluentButton href="https://github.com/ClassIsland/ClassIsland" target="_blank">
          <template #prepend><FluentSystemIcon name="github" /></template>
          了解更多
        </FluentButton>
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
  flex-wrap: wrap;
  gap: 16px;
}

.content-flex-layout > * {
  flex-grow: 1;
  flex-basis: 250px;
}

.content {
  padding-top: 42px;
  padding-bottom: 42px;
}

.components-demo-wrap {
  width: 100vw;
  width: 100dvw;
  margin-top: 32px;
  margin-left: calc(50% - 50vw);
  margin-left: calc(50% - 50dvw);
  overflow: hidden;
}

.components-demo {
  display: block;
  width: 100%;
  height: clamp(220px, 20vw, 520px);
  object-fit: cover;
  object-position: center;
}

.introduction-container {
  position: relative;
  overflow: hidden;
}

.introduction {
  width: 100%;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  padding-right: clamp(160px, 24vw, 440px);

  @media (max-width: 1000px) {
    padding-right: clamp(56px, 12vw, 120px);

    .img-col {
      display: none;
    }
  }

  @media (max-width: 675px) {
    padding-right: 0;
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
  flex-direction: row;
  align-items: center;
  align-self: start;
  column-gap: 16px;
  row-gap: 8px;
}

.app-logo {
  width: 96px;
  height: 96px;

}

.introduction-col {
  min-width: min(400px, 100%);
  max-width: 100%;
  flex-basis: 480px;
}

.intro-seq {
  @apply motion-safe:animate-[introColFadeInLeft_.72s_cubic-bezier(0.16,1,0.3,1)_both];
  animation-delay: var(--intro-delay, 0ms);
}

.brand-title {
  font-size: 36px;

  @media (max-width: 675px) {
    font-size: 36px;
  }
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
  font-size: 48px;
  line-height: 54px;
  font-weight: bold;
}

.feature-tags {
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
  .feature-tags-main{
    font-size: 32px;
  }
}

.introduction-container{
  background: radial-gradient(44.58% 35.38% at 78.87% 75.56%, #0C0E1F 0%, rgba(12, 14, 31, 0.00) 100%), radial-gradient(76.32% 55.47% at -4.1% 9.31%, #0C0E1F 0%, rgba(12, 14, 31, 0.00) 100%), #0D1111;
}
.introduction-bg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: clamp(620px, 88vw, 1600px);
  z-index: 0;
  pointer-events: none;
  background-position: left center, right center;
  background-image:
    linear-gradient(
      90deg,
      rgba(13, 17, 17, 1) 0%,
      rgba(13, 17, 17, 1) 5%,
      rgba(13, 17, 17, 0.8) 22%,
      rgba(13, 17, 17, 0.4) 32%,
      rgba(13, 17, 17, 0) 58%,
      rgba(13, 17, 17, 0) 100%
    ),
    url("../assets/app-v2/banner.webp");
  background-repeat: no-repeat;
  background-size: 100% 100%, 100% auto;

  @media (max-width: 1200px) {
    width: clamp(520px, 84vw, 1120px);
    background-size: 100% 100%, 100% auto;
  }

  @media (max-width: 1000px) {
    width: clamp(420px, 92vw, 920px);
    background-image:
      linear-gradient(
        90deg,
        rgba(13, 17, 17, 1) 0%,
        rgba(13, 17, 17, 1) 5%,
        rgba(13, 17, 17, 0.9) 20%,
        rgba(13, 17, 17, 0.7) 42%,
        rgba(13, 17, 17, 0.25) 78%,
        rgba(13, 17, 17, 0) 100%
      ),
      url("../assets/app-v2/banner.webp");
    background-position: left center, right bottom;
    background-size: 100% 100%, 100% auto;
  }

  @media (max-width: 675px) {
    width: clamp(360px, 120vw, 760px);
    background-image:
      linear-gradient(
        90deg,
        rgba(13, 17, 17, 1) 0%,
        rgba(13, 17, 17, 1) 5%,
        rgba(13, 17, 17, 0.8) 20%,
        rgba(13, 17, 17, 0.7) 32%,
        rgba(13, 17, 17, 0.6) 78%,
        rgba(13, 17, 17, 0) 100%
      ),
      url("../assets/app-v2/banner.webp");
    background-position: left center, right 85%;
    background-size: 100% 100%, 100% auto;
  }


}

.intro-bg-enter {
  @apply motion-safe:[transform-origin:right_center] motion-safe:[will-change:transform,opacity] motion-safe:animate-[introBgFlyInRightExpand_0.75s_cubic-bezier(0.16,1,0.3,1)_60ms_both];
}

@keyframes introColFadeInLeft {
  0% {
    opacity: 0;
    transform: translate3d(-42px, 0, 0);
  }

  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes introBgFlyInRightExpand {
  0% {
    opacity: 0;
    transform: translate3d(96px, 0, 0) scale(0.86);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
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

.cyrene {
  background-image: var(--cyrene-gradient);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.brand-description {
  font-size: 20px;
}

.platform-requirement{
  font-size: 13px;
  /* opacity: 0.75; */
}
</style>

<script lang="ts" setup>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import IFeature from '../interfaces/IFeature';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PluginCard from "../components/PluginCard.vue";

import { useHead } from '@unhead/vue'
import FluentButton from '../components/fluent/FluentButton.vue';
import FluentCard from '../components/fluent/FluentCard.vue';
import FluentFlipView from '../components/fluent/FluentFlipView.vue';
import FluentSystemIcon from '../components/FluentSystemIcon.vue';

import screenshot1 from '../assets/app-v2/profile1.webp';
import screenshot5 from '../assets/app-v2/profile5.webp';
import screenshot2 from '../assets/app-v2/profile2.webp';
import screenshot3 from '../assets/app-v2/profile3.webp';
import screenshot4 from '../assets/app-v2/profile4.webp';
import desktopArch from '../assets/app-v2/platforms/arch.png';
import desktopMac from '../assets/app-v2/platforms/mac.png';
import desktopUos from '../assets/app-v2/platforms/uos.png';
import desktopWindows from '../assets/app-v2/platforms/windows.png';
import Subtitle from '../components/Subtitle.vue';
import FeatureTitle from '../components/FeatureTitle.vue';

const screenshots = [screenshot1, screenshot5, screenshot2, screenshot3, screenshot4];
const screenshotsPlatforms = [desktopWindows, desktopUos, desktopArch, desktopMac];

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
let featureTagInterval: ReturnType<typeof setInterval> | null = null;
let scrollRevealContext: gsap.Context | null = null;

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
    icon: 'peopleCommunity',
    description: '屏幕上方横幅显示'
  },
  {
    title: '全屏特效',
    icon: 'layer',
    description: '炫酷显眼波浪特效'
  },
  {
    title: '语音播报',
    icon: 'personVoice',
    description: '支持离线的系统 TTS、EdgeTTS 和 GPT-SoVITS'
  },
  {
    title: '音效',
    icon: 'speaker2',
    description: '清新提醒音效，还可以自定义哦'
  }
];

onMounted(() => {
  featureTagInterval = setInterval(() => {
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

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  scrollRevealContext = gsap.context(() => {
    const contentBlocks = gsap.utils.toArray<HTMLElement>('.content > *');
    contentBlocks.forEach((block) => {
      gsap.from(block, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: block,
          start: 'top 88%',
          once: true,
        },
      });
    });
  });
});

onBeforeUnmount(() => {
  if (featureTagInterval) {
    clearInterval(featureTagInterval);
    featureTagInterval = null;
  }

  scrollRevealContext?.revert();
  scrollRevealContext = null;
});
</script>
