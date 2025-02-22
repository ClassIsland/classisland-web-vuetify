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


// 创建Vue应用实例，指定根组件为App
export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, router, routes, isClient, initialState }) => {
    // 在这里使用例如 app.use(pinia) 或者 router.use()
    registerPlugins(app);
  }
)
