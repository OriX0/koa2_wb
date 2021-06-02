### 简介

一个纯后端实现的类微博项目

[慕课地址](https://coding.imooc.com/class/388.html)

### 整体架构设计

![](https://i.loli.net/2021/06/02/1gQCcqETsdiMbxY.png)

### 数据模型

![](https://i.loli.net/2021/06/02/Vdj6Mg2DRLbylmX.png)

### src目录结构

![](https://i.loli.net/2021/06/02/2nNUriem64ESYVO.png)

### 技术栈

#### 数据库：

- Mysql  
- Redis ---session持久化 微博首页缓存

#### 服务器

- koa2

#### 视图模板：

- EJS

### 登录方案

cookies+session（redis做储存）



