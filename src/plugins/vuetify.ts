/**
 * plugins/vuetify.ts
 *
 * 框架文档：https://vuetifyjs.com`
 */

// 样式
// 导入Material Design Icons字体样式
import '@mdi/font/css/materialdesignicons.css';
// 导入Vuetify样式
import 'vuetify/styles';

// 可组合功能
// 从'vuetify'导入创建Vuetify的函数
import { createVuetify } from 'vuetify';

// 查看Vuetify的特性指南：https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
// 创建并配置Vuetify实例
export default createVuetify({
  theme: {
    // 设置默认主题为暗黑模式
    defaultTheme: 'dark'
  }
});
