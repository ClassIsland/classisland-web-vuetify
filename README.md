# ClassIsland官网

本仓库包含ClassIsland官方网站的源代码，采用[Vuetify](https://vuetifyjs.com/)框架进行了全面的界面设计与功能重构，旨在提升用户体验及网站性能。

## 开发环境搭建

### 环境要求

- **Node.js**：需要Node 20及以上版本。推荐使用[nvm](https://github.com/nvm-sh/nvm)进行版本管理。
- **Yarn** 必须使用Yarn进行依赖管理。其他包管理器不受支持并且会被检测脚本阻断。

### 安装依赖

```sh
yarn install
```

运行开发服务器

```sh
yarn dev
```

访问控制台中的地址即可预览开发中的网站。

### 构建生产版本

```sh
yarn build
```

构建完成后，生产文件将位于 `dist/` 目录下，适合部署到生产环境。

## 贡献指南

在提交 Pull Request 前，请确保代码符合我们的编码规范。
开发新功能或修复问题时，请先创建相关 Issue 进行讨论。
保持分支的整洁，每个 Pull Request 应该只包含一个功能或修复。

在提交之前，请务必执行下面的命令格式化代码：

```sh
yarn format
```

## 许可证

本项目遵循 MIT License。欢迎贡献和使用！
