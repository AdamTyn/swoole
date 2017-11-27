# swoole-live-barrage
Swoole-Live&amp;Barrage

## 简介
本项目基于 **websocket**协议，使用了开源 **swoole** 扩展开发的**简易WEB视频直播**

## 目录说明
- **/php** 目录为 **swoole** 编写的文件
  - **/client** 记录客户端目录
  - **word.php** 为弹幕文件
  - **online.php** 为视频流处理文件
  - **func.php** 为自定义函数文件
- **/html** 目录为静态页面文件
- **css** 目录为样式文件
- **js** 目录为 **JavaScript** 文件
## 服务端
- 配置好 **swoole** 的 **Linux** 服务器，开发环境可以选择虚拟机本地服务器
- [点此获得配置完整的虚拟机](https://pan.baidu.com/s/1qYQajW4)
- **clone** 此代码，将 **/php** 目录上传至服务器任意目录
- 使用 **php-cli** 执行 **/php** 目录下的 **word.php** 和 **online.php** :
  - `php word.php`
  - `php online.php`
## 客户端
- 在主机也需要配置好 **web** 环境，切记不可直接双击 **html** 文件打开
## 优化及改进
- 视频的转码解码导致观看界面的视频模糊，想要更好的效果需要使用 **HLS** 及 **RTMP** 协议
- 优化网页的美观度
- 较新的浏览器已经逐渐使用 **MediaDevices.getUserMedia()** 取代 **navigator.getUserMedia()**
