/**
 * 主入口文件
 *
 * 本文件负责初始化Vue应用，包括安装必要的插件和挂载根组件。
 */

// 导入插件注册逻辑
// Plugins
import { registerPlugins } from '@/plugins';

// 导入App组件
// Components
import App from './App.vue';

//导入虚拟模块以注册SVG图标
import 'virtual:svg-icons-register';

import './styles/main.scss';
import {ViteSSG} from "vite-ssg";
import {routes} from "vue-router/auto-routes";
import * as Sentry from "@sentry/vue";
import chalk from 'chalk';

const asciiLogo =
  "---------------------------------------------------------------\n" +
  "   ____  _                   ___       _                    _ \n" +
  "  / ___|| |  __ _  ___  ___ |_ _| ___ | |  __ _  _ __    __| |\n" +
  " | |    | | / _` |/ __|/ __| | | / __|| | / _` || '_ \\  / _` |\n" +
  " | |___ | || (_| |\\__ \\\\__ \\ | | \\__ \\| || (_| || | | || (_| |\n" +
  "  \\____||_| \\__,_||___/|___/|___||___/|_| \\__,_||_| |_| \\__,_|\n" +
  "---------------------------------------------------------------\n" +
  "ClassIsland —— 一款适用于班级大屏的课表信息显示工具，可以一目了然地显示各种信息。\n";

// 创建Vue应用实例，指定根组件为App
export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, router, routes, isClient, initialState }) => {
    // 在这里使用例如 app.use(pinia) 或者 router.use()
    registerPlugins(app);
    if (isClient) {
      Sentry.init({
        app,
        dsn: "https://5f8b7ae1646638a671474219382cfb7b@todayeatsentry.classisland.tech:21815/8",
        integrations: [
          Sentry.browserTracingIntegration({ router }),
          Sentry.replayIntegration(),
        ],
        // Tracing
        tracesSampleRate: 0.1, //  Capture 100% of the transactions
        // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: ["localhost", /^https:\/\/get\.classisland\.tech/],
        // Session Replay
        replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
        replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
      });

      console.log(chalk.hex("#00bfff")(asciiLogo) + '\n' + chalk.hex("#FF9AFC")("⌈不想前进的时候，就暂且停下脚步吧。⌋") + '\n'
        + chalk.hex("#81ddff")("⌈愿我们在那鲜花芬芳的西风尽头重逢。⌋"))

    }
  }
)
