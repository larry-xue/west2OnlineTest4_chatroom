import io from 'socket.io-client';
import bus from './bus';

const CHAT = {
  user: {
    uid: '',
    name: '',
    icon: '/static/icon/default.jpg',
    email: '',
    phone: '',
    autograpgh: '',
  },
  megArr: [
  ],
  // 这是用来存储房间里其他人信息的对象--key为用户的uid value为他们对应信息
  // 主要是用于megItem中--如果megItem找不到uid对应信息，则会去请求获取该用户信息，然后添加进去
  groupMember: {

  },
  roomInfo: {
    name: 'chat room',
    topic: 'come on ....',
    describe: 'a chat room ...',
    icon: '/static/icon/default.jpg',
    owner: '', // 房主的sid
    url: '',
  },
  socket: null,
  onlineUserCount: 0,

  // 登出
  logout() {
    this.socket.disconnect();
  },

  // 更新用户信息


  // 修改群组信息
  changeGroupInfo(data) {
    this.socket.emit('change_room_message', data);
    // console.log('change');
  },

  // 创建群聊
  createGroup(data) {
    this.socket.emit('create_room', data);
  },

  // 解散群聊
  fireGroup() {
    this.socket.emit('break_room', {
      rid: CHAT.roomInfo.rid,
    });
  },

  // 获取其他用户信息
  getOtherUser(otheruid) {
    this.socket.emit('user_inform', {
      uid: otheruid,
    });
  },

  // 获取消息记录
  getMegList() {
    this.socket.emit('get_message_lis', {
      rid: CHAT.roomInfo.rid,
      // index: ,
    });
  },

  // 发送消息
  sendMeg(data) {
    this.socket.send(data);
    // console.log('send');
  },

  // init
  init(uid) {
    // 连接服务器
    this.socket = io.connect('http://39.97.113.252:5000/chat');
    // console.log(this.socket);

    // 通过url拿到rid房间号
    const { href } = window.location;
    const tempurl = href.split('?');
    let roomid = '';
    // eslint-disable-next-line no-empty
    if (href === tempurl[0]) {
    } else {
      // eslint-disable-next-line prefer-destructuring
      roomid = tempurl[1].split('#')[0];
      // eslint-disable-next-line prefer-destructuring
      roomid = roomid.split('=')[1];
    }

    // 修改群聊链接
    CHAT.roomInfo.url = `http://123.57.215.101:3000/chatroom?rid=${roomid}`;

    // 初始化用户信息
    const localUser = JSON.parse(localStorage.getItem('userInfo'));
    if (localUser === null) {
      CHAT.user.uid = uid;
      localStorage.setItem('userInfo', JSON.stringify(CHAT.user));
    } else {
      CHAT.user = localUser;
    }

    // console.log(CHAT.user);

    // 房主接收房间信息修改
    this.socket.on('owner_change', (res) => {
      // 返回的rid为当前房间---修改
      // console.log('owner', res);
      if (res.data.rid === CHAT.roomInfo.rid) {
        const shareurl = `http://123.57.215.101:3000/chatroom?rid=${res.data.rid}`;
        CHAT.roomInfo = res.data;
        // console.log('owner', res);
        CHAT.roomInfo.icon = res.data.icon;
        CHAT.roomInfo.url = shareurl;
        // console.log('room-edit-success');
        // 发送请求成功的消息
        bus.$emit('change_group_success', {
          content: '群聊信息修改成功辣 ！',
          title: 1,
          event: 'change_group_success',
        });
      } else {
      // 发送创建成功的消息
        // console.log('create-success', res.data);
        CHAT.roomInfo = res.data;
        const shareurl = `http://123.57.215.101:3000/chatroom?rid=${res.data.rid}`;
        CHAT.roomInfo.icon = res.data.icon;
        bus.$emit('change_group_success', {
          content: `群聊创建成功 ！${shareurl}`,
          title: 1,
          event: 'change_group_success',
        });
        window.open(shareurl);
      }
    });

    // 普通成员接收房间信息
    this.socket.on('room_message', (res) => {
      const { url } = CHAT.roomInfo;
      CHAT.roomInfo = res.data;
      CHAT.roomInfo.url = url;
      // console.log('room-message', res.data);
      // console.log(CHAT.roomInfo);
    });

    this.socket.emit('join_room', {
      rid: roomid,
    });
    // console.log(roomid, 'roomid');

    this.socket.emit('get_room_message', {
      rid: roomid,
    });

    // 接收新消息
    this.socket.on('message', (res) => {
      const temp = res;
      temp.typeName = 'message';
      // console.log(res);
      CHAT.megArr.push(temp);
    });

    // 接收消息列表
    this.getMegList();
    this.socket.on('message_list', () => {
      // console.log(res);
    });

    // 接收解散群聊消息
    // this.socket.on('room_alive', (res) => {
    //   console.log(res);
    // });

    // 接收查询其他用户的信息
    this.socket.on('user_inform', (res) => {
      if (res.data.message !== '"用户已注销"') {
        CHAT.groupMember[res.data.uid] = res.data;
        // console.log(CHAT.groupMember);
        bus.$emit('other_user', res.data);
      }
    });

    // 监听公告
    this.socket.on('announcement', (res) => {
      CHAT.megArr.push(res.data);
    });

    // 监听当前在线人数
    this.socket.on('room_people', (res) => {
      // console.log(res, 'room-people');
      CHAT.onlineUserCount = res;
    });

    // 退出房间
    this.socket.on('disconnect', (res) => {
      CHAT.megArr.push(res.data);
    });
    // console.log(window.location.href);
  },
};

export default CHAT;
