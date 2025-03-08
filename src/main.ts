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

import {install} from 'source-map-support';
install();


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
          Sentry.browserTracingIntegration(),
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
    }
  }
)
