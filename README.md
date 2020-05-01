# 项目

## 项目地址

click [here](http://123.57.215.101:3000/chatroom) chat with me🤭

## 技术栈

***

vue2 + vue-cli3 +axios+socket io client+ vuescroll + font-awesome + moment.js + vue-clipboard2

***

## 项目运行流程

### 项目结构

***

- |app.vue
    - |userInfo.vue
    	- |userSettings.vue
    	- |userProfile.vue
    - |chat.vue
    	- |chatNav.vue
    	- |chatBody.vue
    	- |chatSide.vue
    - |GroupCreate.vue

   ***一些通用组件***
- |alertCpm.vue
- |megItem.vue
- |normalSettingItem.vue
- |searchCmp.vue
- |profileItem.vue
- |uploadAndShowImg.vue

***

### 运行流程

***

*前情提要*

- 默认页面为用户信息页
- 下面提到的megArr， GroupArr等一些数据都是维护在socket.js中  并export default CHAT作为全局变量
- 提示框是通过event bus来跨组件间传递状态

*正文*

- 识别用户
  - 新用户进入页面会自动请求生成一个新用户  后端返回uid以此来识别用户 存储在本地
  - 如果此前已经存在uid 请求则返回该uid

-  init  

    - 连接后端服务器
    - 从url中读取roomid 
    - 查看本地有无存储用户信息  若有则初始化  否则在本地存储默认信息
    - 发送加入房间的事件  若房间号错误则会提示
    - 监听得到该房间的信息  初始化房间信息
    - 发送获取最近十条消息记录的事件  存储在消息数组中
    - 触发查询其他用户信息的事件  并维护在groupMember数组中
    -  然后就是监听 一些事件
        - 群聊解散
        - 接受新消息
        - 公告
        - 在线人数
        - 房间信息修改
        - 等等.....

- 用户信息修改

  - 检测头像或文字信息中的item 至少有一个输入
  - 根据是否上传图片分别发送请求
  - 若成功则修改存储在本地的信息  更新当前用户信息
  - 触发通知在房间内的其他用户  他信息的更改
  - 如果是监听到其他用户的信息修改则更新groupMember中对应内容

- 聊天部分

  - 发送消息
    - 判断文字或图片至少有其一  
    - 如果有图片则先上传返回url之后再触发sendMeg事件
    - 否则直接触发
  - 接收消息
    - 判断该用户信息是否位于groupMember数组中
      - 若否，则触发查看其他用户信息的事件
      -   设置定时器在200ms后在push进megArr
    - 处理收到的消息
      - needScroll 是否需要滑到底部
      - typeName： 消息类型（message为信息，announce为公告）
  - 聊天记录搜索
    - 考虑到当前页面的消息直接ctrl+F就行了  所以就直接提交搜索内容给后端
    - 得到消息列表后存在searchList数组再循环展示出来

- 群组部分

  - 创建群组

    - 判断是否至少输入群名
    - 触发创建群聊事件
    - 监听到群聊信息修改事件
      - 若roomid和当前房间一样 
        - 修改当前存储群组信息的数组
      - roomid不同
        - 提示群组已创建 并打开新群组的页面

  - 群组信息修改

    - 触发修改群组事件
    - 其余和创建相同

    

## 其他

- 关于项目上线的一些问题：

  ​	我是通过node.js监听3000端口  若访问的path为/chatroom  则返回静态文件(dist)

  ​	虽然分享的群聊链接后面跟的一个很像get请求的东西  但是实际上它只是我拼接上去的🐕仅仅是用于区别	不同	房间

  ​	例：http://123.57.215.101:3000/chatroom/?rid=3084dfa243b04b5fba64dd72f68a1c17#/chat

- 网站匿名性

  ​	由于用户每次访问的实际上是同一个域名  所以cookie都是相同的 

  ​	用户在一个房间信息修改  其他房间他的信息也会同步更改

  ​	如果不想被人发现就清一下cookie或者换一个浏览器吧🐱

  

