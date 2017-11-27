# swoole-live-barrage
Swoole-Live&amp;Barrage

## 简介
参考自互联网的用例，使用了开源 **swoole** 扩展开发的**简易WEB视频直播**

## 目录说明
- **/php** 目录为 **swoole** 编写的文件
  - **/client** 记录客户端目录
  - **word.php** 为弹幕文件
  - **online.php** 为视频流处理文件
  - **func.php** 为自定义函数文件
- **/html** 目录为 **swoole** 编写的文件 
## 服务端
- 配置好 **swoole** 的 **Linux** 服务器，开发环境可以选择虚拟机本地服务器
- [点此获得配置完整的虚拟机](https://pan.baidu.com/s/1qYQajW4)
- **clone** 此代码，将 **/php** 目录上传至服务器任意目录
- 使用 **php-cli** 执行 **/php** 目录下的 **word.php** 和 **online.php** :
  - `php word.php`
  - `php online.php`
## 客户端
- 在主机也需要配置好 **web** 环境，切记不可直接双击 **html** 文件打开
