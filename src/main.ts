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

// 导入Vue创建应用的函数
// Composables
import { createApp } from 'vue';

// 创建Vue应用实例，指定根组件为App
const app = createApp(App);

// 注册插件
registerPlugins(app);

// 将应用实例挂载到HTML元素上，元素的id为'app'
app.mount('#app');
