# tw-homework

## Project Template
项目所用模版是我之前基于webpack3写的多页面大包模版，见[link](https://github.com/alanchenchen/simple-template)
## Finished
1. desktop HD适配，其余设备在部分ui响应式适配成功，由于时间原因并没有写完所有设别的响应式适配
2. 两个function interact均完成
3. 未使用任何第三方js和css包

# npm scripts
* start   启动本地服务器
* build   打包项目，输出目录为dist，项目可以直接浏览器打开，所有静态资源引入路径已做处理
* test    本地测试

# Unit Test
使用mocha作为测试库，使用node自带的assert作为断言包。测试了项目里公用dom.js的传参错误处理.