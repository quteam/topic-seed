# 活动专题自动化
基于 webpack、vue2 的活动专题自动化工具

## 安装

```bash
npm install
```

## 说明

一个项目一个目录，每个项目必须有 `package.json`。

开发模式
```bash
npm run dev
```
生成生产环境文件
```bash
npm run build
```

## package.json 说明

```json
{
  "name": "base",
  "description": "base",
  "version": "1.0.0",
  "author": "Haovei <haovei@qq.com>",
  "private": true,
  "scripts": {
    "dev": "node ../../build/base/dev-server.js",   //开发模式，现有两种模式 base、vue，普通模式用 base，vue 项目用 vue
    "build": "node ../../build/base/build.js"       //打包生产环境
  },
  "webpackDefine": {
    "VERSION": "'v1.0.0'"   //webpack 全局变量
  }
}
```