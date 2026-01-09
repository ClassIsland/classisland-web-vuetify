<script setup lang="ts">
import {onMounted, ref} from "vue";
import { useRoute } from 'vue-router';
import {IndexIds} from "../../../../../../indexIds";
import { useHead } from '@unhead/vue';
import tracedFetch from '../../../../../../utils/tracedFetch';


const pageMeta = [
  {
    name: 'description',
    content: 'ClassIsland 是一款适用于班级大屏的课表信息显示工具，可以一目了然地显示各种信息。',
  },
  {
    name: 'robots',
    content: 'none'
  }
]

const pageTitle = ref('感谢下载 ClassIsland！ | ClassIsland')

useHead({
  title: pageTitle,
  meta: pageMeta
})

const isLoading = ref(true);
const downloadInfo = ref({
  "archiveUrl": "",
  "archiveSHA512": "",
  "version": ""
});
const isError = ref(false);

const route = useRoute();
const version = route.params.version;
const appSubChannel = route.params.appSubChannel;
const showCopiedSnackbar = ref(false);

const subChannelParts = appSubChannel.toString().split("_");
const scOs = subChannelParts.length >= 1 ? subChannelParts[0] : "";
const scArch = subChannelParts.length >= 2 ? subChannelParts[1] : "";
const scBuildType = subChannelParts.length >= 3 ? subChannelParts[2] : "";
const scPackage = subChannelParts.length >= 4 ? subChannelParts[3] : "";

async function init(){
  try {
    console.log('Route params:', { version: version.toString(), appSubChannel: appSubChannel.toString() });

    const result = await tracedFetch( `https://distribution.classisland.tech/api/v1/public/distributions/web/${version}/${appSubChannel}`);
    const { code, content, message } = await result.json();
    if (code != 0){
      throw new Error(`获取下载数据失败：${message} (${code})`);
    }
    downloadInfo.value = content;

    // 更新页面标题
    pageTitle.value = `感谢下载 ClassIsland ${downloadInfo.value.version}！ | ClassIsland`;

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
  link.href = downloadInfo.value.archiveUrl;
  link.download = "ClassIsland_" + appSubChannel + "_" + downloadInfo.value.version + ".zip";
  document.body.appendChild(link);
  link.click();
}

function copyDownloadUrl(){
  navigator.clipboard.writeText(downloadInfo.value.archiveUrl);
  showCopiedSnackbar.value = true;
}

function copyChecksum() {
  navigator.clipboard.writeText(downloadInfo.value.archiveSHA512);
  showCopiedSnackbar.value = true;
}

onMounted(() => init());
</script>

<template>
  <div class="d-flex download-container flex-column">
    <div v-if="!isError" class="flex-column mt-12 ">
      <div class="page-margin-x">
        <div v-if="isLoading" class="d-flex flex-column">
          <v-skeleton-loader class="align-self-stretch mb-6" height="60px"/>
          <v-skeleton-loader class="align-self-stretch mb-16" height="24px"/>
          <v-skeleton-loader class="align-self-stretch mb-6" height="56px"/>
          <v-skeleton-loader class="align-self-stretch mb-6"  height="56px"/>
        </div>
        <div v-else>
          <h2 class="align-self-center text-center mb-6 text-h2 font-weight-bold download-main-title">感谢下载 ClassIsland {{ downloadInfo.version }} ！</h2>
          <p class="text-center align-self-center mb-16">您的下载即将开始。如果下载在 30 秒内没有开始，请点击<a :href="downloadInfo.archiveUrl" id="downloadLink" :download='"ClassIsland_" + appSubChannel + "_" + downloadInfo.version + ".zip"'>此处</a>手动开始下载。</p>

          <v-text-field label="直接下载链接" variant="outlined" readonly v-model="downloadInfo.archiveUrl" append-icon="mdi-content-copy" @click:append="copyDownloadUrl"/>
          <v-text-field label="校验和（SHA512）" variant="outlined" readonly v-model="downloadInfo.archiveSHA512" append-icon="mdi-content-copy" @click:append="copyChecksum"/>
        </div>

        <p>请注意核对文件 SHA512 是否正确。</p>

        <v-alert type="info" variant="outlined" class="mb-4 mt-4" color="cyan-lighten-3">
          <p v-if="scPackage=='folder'">您下载的是便携版 ClassIsland，<b>需要完整解压<span v-if="scBuildType=='full'">并按照指示安装运行时</span></b>后才能使用。 <span v-if="scBuildType=='full'">如果您要安装本应用的设备有自动还原功能，我们建议您下载含运行时的版本，以免去在每次系统还原后重新安装运行时的麻烦。</span></p>
          <p v-else-if="scPackage=='installer'">您下载文件是 ClassIsland 安装程序，您需要先运行此安装程序才能使用 ClassIsland。 </p>
          <p v-else-if="scPackage=='deb' || scPackage=='pkg'">您下载文件是 ClassIsland 安装包，您需要先安装此安装包才能使用 ClassIsland。 </p>
        </v-alert>
      </div>

      <div class="page-margin-x py-4 mt-8">
        <h2>三步安装 ClassIsland</h2>
        <div class="d-flex flex-row my-4 ga-6 flex-wrap">
          <div class="setup-step" v-if="scPackage == 'folder'">
            <v-img v-if="scOs == 'windows'" src="../../../../../../assets/setup/windows/1.png" class="mb-4"/>
            <v-img v-if="scOs == 'linux'" src="../../../../../../assets/setup/linux/6.png" class="mb-4"/>
            <h3>第一步：解压应用</h3>
            <p>在一个合适的地方<span v-if="scOs == 'windows'">（比如 D 盘等）</span><span v-else>（比如用户目录等）</span>新建一个文件夹，将下载的压缩包中的文件解压到文件夹中。</p>
            <p class="text-caption text-orange-darken-2 mt-2">
              <v-icon size="small" class="mr-1">mdi-alert-circle</v-icon>
              注意：请选择有读写权限的位置，避免中文路径，程序所有数据将存储在此目录中。
            </p>
          </div>
          <div class="setup-step" v-else>
            <v-img v-if="scOs == 'macos'" src="../../../../../../assets/setup/macos/7.png" class="mb-4"/>
            <v-img v-if="scOs == 'linux'" src="../../../../../../assets/setup/linux/4.png" class="mb-4"/>
            <h3>第一步：安装应用</h3>
            <p>下载完成后，运行刚刚下载的安装包并按照提示完成安装。</p>
          </div>
          <div class="setup-step" v-if="scBuildType == 'full'">
            <v-img v-if="scOs == 'windows'" src="../../../../../../assets/setup/windows/2.png" class="mb-4"/>
            <h3>第二步：安装 .NET 运行时</h3>
            <p>运行应用，如果您的设备没有安装 .NET 运行时，可以根据启动应用后的弹窗的指示安装 .NET 运行时。</p>
          </div>
          <div class="setup-step">
            <v-img v-if="scOs == 'windows'" src="../../../../../../assets/setup/windows/3.png" class="mb-4"/>
            <v-img v-if="scOs == 'linux'" src="../../../../../../assets/setup/linux/5.png" class="mb-4"/>
            <v-img v-if="scOs == 'macos'" src="../../../../../../assets/setup/macos/8.png" class="mb-4"/>
            <h3 v-if="scBuildType == 'full'">第三步：开始使用</h3>
            <h3 v-else>第二步：开始使用</h3>
            <p v-if="scBuildType == 'full'">完成上述步骤后，再次运行应用，根据应用弹出的欢迎向导即可完成应用设置。</p>
            <p v-else>完成上述步骤后运行应用，根据应用弹出的欢迎向导即可完成应用设置。</p>
          </div>
          <div class="setup-step" v-if="scBuildType != 'full'">
            <v-img src="../../../../../../assets/setup/completed.png" class="mb-4"/>
            <h3>第三步：大功告成</h3>
            <p>大功告成，开始您的 ClassIsland 之旅吧！</p>
          </div>
        </div>
        <v-alert type="info" variant="outlined" class="mb-4" color="blue-lighten-3"
                 v-if="scPackage=='folder'">
          <div class="font-weight-bold">💡 便携版说明</div>
          <p class="mb-1">• 您下载的是便携版 ClassIsland，会在程序文件夹中储存所有配置和数据</p>
          <p class="mb-1">• 配置完成后，您可以直接将整个文件夹复制到学校使用</p>
          <p v-if="scBuildType=='full'" class="mb-0">• 由于您下载的版本不包含运行时，您在学校安装本应用时可能需要一并安装 .NET 桌面运行时</p>
        </v-alert>
        <p>更详细的安装说明请参见文档<a href="https://docs.classisland.tech/app/setup.html" target="_blank">安装与开始</a>。</p>

      </div>

      <v-sheet class="elevated-sheet">
        <div class="page-margin-x py-4 mt-8">
          <h2>🚀 快速上手 ClassIsland</h2>
          <p class="mt-2">通过以下资源快速上手 ClassIsland，编排/导入您的第一个课表。</p>

          <div class="d-flex flex-row my-4 ga-6 flex-wrap">
            <v-card variant="outlined" class="setup-step" title="🎬 观看入门教程视频"
                    prepend-icon="mdi-video"
                    target="_blank"
                    href="https://www.bilibili.com/video/BV1fA4m1A7uZ/">
              <template v-slot:text>
                <div class="text-yellow-darken-2 font-weight-medium">推荐新用户优先观看</div>
                在 BiliBili 上观看 ClassIsland 入门教程视频，十分钟入门 ClassIsland。
              </template>
            </v-card>
            <v-card text="深入了解 ClassIsland。" variant="outlined" class="setup-step" title="📚 浏览帮助文档"
                    prepend-icon="mdi-book-open-variant"
                    target="_blank"
                    href="https://docs.classisland.tech/app/"/>
          </div>

          <p>使用过其它课表软件？您可以使用 CSES 或 <a href="https://migrate.classisland.tech/" target="_blank">ClassIsland 迁移向导</a>快速从其它课表软件导入课表。</p>

        </div>
      </v-sheet>

      <div class="page-margin-x py-4 mt-8">
        <h2>❓ 常见问题解答</h2>
        <v-expansion-panels class="mt-4">

          <v-expansion-panel title="⚡ 程序启动后提示安装 .NET？" v-if="scBuildType=='full'">
            <v-expansion-panel-text>
              这是正常现象。首次运行时，程序会检测并提示安装 .NET 运行时。
              <br>• 点击安装按钮，程序会自动跳转到 .NET 官方网站下载安装程序
              <br>• 安装完成后重新运行 ClassIsland 即可
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel title="📁 建议放在哪个文件夹？" v-if="scPackage=='folder'">
            <v-expansion-panel-text>
              推荐放置位置：<br/>
              <span v-if="scOs=='windows'">• <code>D:\ClassIsland\</code>（推荐）<br/></span>
              <span v-if="scOs=='windows'">• <code>C:\Users\你的用户名\ClassIsland\</code><br/></span>
              <span v-if="scOs=='linux'">• <code>~/ClassIsland</code>（推荐）<br/></span>
              <strong>避免放在：</strong>桌面、下载文件夹、含中文路径的位置
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel title="🎯 如何开始使用？">
            <v-expansion-panel-text>
              1. 首次运行会弹出欢迎向导，跟随引导完成基本设置
              <br>2. <strong>强烈建议先观看上方的视频教程</strong>
              <br>3. 在档案编辑器中添加您的课表和时间表
              <br>4. 根据需要调整组件和插件
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>

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
