<template>
  <div id="app">
    <div id="header">
      <div class="logo">
        <img src="../public/logo.png">
      </div>
      <nav>
        <i class="fa fa-pencil-square-o fa-2x">
          <router-link to="/GroupCreate"></router-link>
        </i>
        <i class="fa fa-comment-o fa-2x">
          <div class="point"></div>
          <router-link to="/chat"></router-link>
        </i>
        <i class="fa fa-user-o fa-2x">
          <router-link to="/UserInfo"></router-link>
        </i>
        <i class="fa fa-gear fa-2x"></i>

        <!-- fa fa-send-o -->
      </nav>
    </div>
    <div class="splitLine"></div>
    <div class="content">
      <router-view to="datanow"></router-view>
    </div>
    <alertCpm :alertInfo="alertData" v-show="showAlert"></alertCpm>
  </div>
</template>

<script>
import bus from './bus';
import CHAT from './socket';
import alertCpm from './components/alertCpm.vue';

export default {
  components: {
    alertCpm,
  },
  data() {
    return {
      CHAT,
      datanow: '/chat',
      alertData: {
        content: 'Alert Test',
      },
      showAlert: false,
    };
  },
  methods: {
    beforeunloadFn() {
      this.CHAT.logout();
    },
  },
  created() {
    // 注：fail_user 这个事件确认取消都不触发其他事件 故用作一些不痛不痒的提醒
    window.addEventListener('beforeunload', (e) => this.beforeunloadFn(e));
    bus.$on('check_change_group', () => {
      this.showAlert = true;
      this.alertData = {
        content: '确定修改群组信息？',
        title: 1,
        event: 'change_group',
      };
    });

    bus.$on('dont_show_alert', () => {
      this.showAlert = false;
    });

    bus.$on('change_group_success', (data) => {
      this.showAlert = true;
      this.alertData = data;
    });

    bus.$on('empty_group_info', () => {
      this.showAlert = true;
      this.alertData = {
        content: '输入信息为空 ！',
        title: 0,
        event: 'empty_group',
      };
    });

    // 用户信息修改--提示
    bus.$on('update_userInfo_success', () => {
      this.showAlert = true;
      this.alertData = {
        content: '您的信息已更新 ! ',
        title: 1,
        event: 'update_userInfo',
      };
    });

    bus.$on('update_userInfo_fail', () => {
      this.showAlert = true;
      this.alertData = {
        content: '/(ㄒoㄒ)/~~好像发生了啥~信息修改失败了T^T ',
        title: 1,
        event: 'fail_userInfo',
      };
    });

    // 确认解散房间
    bus.$on('check_delete_room', () => {
      this.showAlert = true;
      this.alertData = {
        content: '你确定确定确定确定确定？？要删除房间？？请三思而后行！！',
        title: 0,
        event: 'check_delete',
      };
    });

    // 拒绝修改——非房主
    bus.$on('refuse_change_room', () => {
      this.showAlert = true;
      this.alertData = {
        content: '你好像不是房主嗷(⊙o⊙)？ 不要干坏事~ ',
        title: 0,
        event: 'fail_userInfo',
      };
    });
    // 房间号错误
    bus.$on('err_rid', () => {
      this.showAlert = true;
      this.alertData = {
        content: '你好像输了个错误群聊链接嗷~~',
        title: 0,
        event: 'fail_userInfo',
      };
    });

    // copy
    bus.$on('copy_success', () => {
      this.showAlert = true;
      this.alertData = {
        content: '复制成功辣~~快去分享吧~~',
        title: 0,
        event: 'fail_userInfo',
      };
    });
    // 没有更早的消息了
    bus.$on('no_more_meg', () => {
      this.showAlert = true;
      this.alertData = {
        content: '没有更早的消息了~~',
        title: 0,
        event: 'fail_userInfo',
      };
    });
    // 创建群聊至少需要名字
    bus.$on('at_least_name', () => {
      this.showAlert = true;
      this.alertData = {
        content: '好歹给个名字呗~~',
        title: 0,
        event: 'fail_userInfo',
      };
    });
  },
  beforeDestroy() {
    CHAT.logout();
    window.removeEventListener('beforeunload', (e) => this.beforeunloadFn(e));
    bus.$off('check_change_group');
    bus.$off('dont_show_alert');
    bus.$off('change_group_success');
    bus.$off('empty_group_info');
    bus.$off('update_userInfo_success');
    bus.$off('check_delete_room');
    bus.$off('update_userInfo_fail');
    bus.$off('refuse_change_room');
    bus.$off('err_rid');
    bus.$off('no_more_meg');
    bus.$off('at_least_name');
  },
  mounted() {
    this.$http.post('/user').then((res) => {
      CHAT.init(res.data.data.uid);
      localStorage.setItem('uid', res.data.data.uid);
    });
  },
};
</script>

<style>

* {
  padding: 0;
  margin: 0;
}

i:hover {
  color: rgb(1,118,255);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}

#header {
  float: left;
  width: 8%;
  height: 100vh;
  background-color: rgb(255,255,255);
  /* border: 1px solid black; */
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 1fr 4fr;
}

router-link {
  width: 100px;
  height: 100px;
}

#header .logo {
  margin-top: 2vh;
}

#header nav {
  display: grid;
  grid-area: 'a'
             'b'
             'c'
             'd';
}

a {
  position: absolute;
  display: inline-block;
  width: 50%;
  height: 4vh;
  top: 0;
  left: 25%;
}

#header nav i {
  position: relative;
}

#header nav i:nth-child(1) {
  align-self: end;
  /* margin-bottom: 5vh; */
}

#header nav i:nth-child(2) {
  align-self: center;
  display: inline-block;
  /* margin-bottom: 5vh; */
}

#header nav i:nth-child(3) {
  align-self: start;
}

#header nav i:nth-child(4) {
  align-self: center;
}

#header nav .point {
  width: 8px;
  height: 8px;
  background-color: rgb(1,118,255);

  position: absolute;
  right: 49%;
  border-radius: 25px;
  bottom: -40%;
}

.splitLine {
  float: left;
  height: 100vh;
  width: 0.27%;
  background-color: rgb(245,246,250);
  /* margin-top: 3vh; */
}

.content {
  float: left;
  width: 91.5%;
  height: 100vh;
  /* margin-left: 0.2vw; */
}
</style>
