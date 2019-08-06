本代码旨在模仿饿了吗多人分享填写订单功能

#### 需要特别考虑的几点

多人分享订单问题
* 1.每个用户登录的时候，服务器怎么知道是哪个用户登录的呢？socket的clients的每个nickName是怎么来的

* 2.需要考虑每个用户的 readyState 状态;当屏幕关闭、唤醒，要注意这个时候的变化。

#### 模仿对象截图
![](https://raw.githubusercontent.com/dirstart/image_bed/master/socket.io0.png)
![](https://raw.githubusercontent.com/dirstart/image_bed/master/socket.io1.png)
![](https://raw.githubusercontent.com/dirstart/image_bed/master/socket.io2.png)
![](https://raw.githubusercontent.com/dirstart/image_bed/master/socket.io3.png)
![](https://raw.githubusercontent.com/dirstart/image_bed/master/socket.io4.png)
![](https://raw.githubusercontent.com/dirstart/image_bed/master/socket.io5.png)
![](https://raw.githubusercontent.com/dirstart/image_bed/master/socket.io6.png)
![](https://raw.githubusercontent.com/dirstart/image_bed/master/socket.io7.png)
![](https://raw.githubusercontent.com/dirstart/image_bed/master/socket.io8.png)

#### 实现方案一 socket.io

可供参考的内容
* https://github.com/jollyburger/xframe/tree/master/server/websocket(忘了哪位大神的库)
* https://tools.ietf.org/html/rfc6455
* https://socket.io

#### 实现方案二 websocket

