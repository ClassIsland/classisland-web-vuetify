/**
 * 此文件负责注册并初始化应用程序中使用的所有插件。
 */

// 导入Vuetify插件
import vuetify from './vuetify';


/**
 * 为应用程序注册所有必要的插件。
 *
 * @param app - 将注册插件的Vue应用程序实例。
 *
 * @说明
 * 此函数在Vue应用程序初始化时调用，用于启用并配置Vuetify UI框架和应用的路由器。
 */
export function registerPlugins(app: App) {
  // 向应用程序实例注册Vuetify插件，然后注册路由器插件
  app.use(vuetify);
}
