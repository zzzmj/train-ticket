## 1. 项目简介

该项目是我独立一人开发的一款火车票查询网站~~~

技术栈：

前端：Typescript + React(hooks) + Redux + React-router
后端：Python + Flask

使用Python爬取12306的火车票信息，前端进行展示

## 2. 前端细节

选择城市，因为城市信息比较大，所以决定使用localStorget做缓存

出发地和到达地由于多个组件都会使用到，所以使用了Redux保存状态

查询的车票信息，考虑了一下，应该需要做缓存，于是决定使用redux做一层缓存层，可以减少很多http请求

