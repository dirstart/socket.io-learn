

关于饿了吗的同类功能
b站、虎牙的弹幕，web端的qq或者钉钉，饿了吗的多人分享，都是用了 websocket。


用户可以通过 帮朋友点、邀请微信好友点餐、邀请钉钉好友 点餐 添加订单人

用户点击帮朋友点：显示 1号订餐人，可以帮朋友点餐(如果是机票的话估计需要朋友的身份证认证的，还需要本人关联了朋友)
用户分享微信出去：（分享的时候，可以看到当前用户已经点的单）注意，这里，还增加了一个功能，和用户点一样的，在机票这里这一点是非常方便的
点完之后，可以选择重新选购
最后点的会在第一个显示

其实不需要这里的分享，这里的分享的作用只是调起手机软件的API而已，分享的也只是网页链接，只是少了用户复制粘贴的过程。
所以我们这里真正的难度其实只是一个 H5 页面。

————————

不同点

1.安全问题，自己需要关联朋友；朋友也要同意帮忙订票(一开始就应该要互相认证)。最后点击确定的时候自己帮朋友买了机票估计要再次验证！！！！
2.被分享者的微信退出之后并不要紧，但是如果发起者退出的话，选购商品会被清空！！（退出后被分享者显示置灰效果）

————————
注意点
1.朋友一起买有没有打折？？？打折力度和单人有什么不同？？
2.通过微信分享的，是通过在哪里 确定是 这个人分享过来的？这里的认证怎么做？？？？！！！！
3.这里要注意，发起人和接受者；等待发起人提交订单，完成后可以看到AA账单
4.强行关闭退出饿了吗后：检测到【微信拼单】意外退出，现在已恢复到退出前的拼单状态（涉及到一个问题，如何判断是用户强制退出？）
——————————
实测之后的理解
1.分享出去的东西能在微信用、能在钉钉用，也能通过 chrome 用，是个 H5 页面，url为：
https://h5.ele.me/spell/?cartId=825ae844b39811e9ac5302420afc2f65&sig=7e433640f31a88234901cb079a93f115&restaurant_id=E13594264673149696675

我们这里可以拆解其中的区分ID


2.这里分享出去的 css 布局方式是 vh、vw。（从这里也发现了vh、vw在这里并不是响应式的，在PC端占据了较大的页面，比较难滑动；但有个好处，这里的vh、vw在浏览器中较大，适合老人使用）
3.跳转之后会调到饿了吗的登录页面
https://h5.ele.me/login/#redirect=https%3A%2F%2Fh5.ele.me%2Fshop%2F%23id%3DE13594264673149696675%26sig%3D7e433640f31a88234901cb079a93f115%26cart_id%3D825ae844b39811e9ac5302420afc2f65