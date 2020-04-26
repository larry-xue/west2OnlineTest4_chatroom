<template>
  <div class="cover">
    <div class="message"
      v-if="message.typeName === 'message'"
      :style="{float:floatRight, flexDirection: flexDirect}">
      <div class="pic">
        <img :src="icon" alt="">
      </div>
      <div class="meg" :style="{backgroundColor: megBgc}">
        <div class="name">
        {{ name }}
        </div>
        <div class="img" v-show="showPic">
          <img :src="message.url">
        </div>
        <div :style="{color: fontColor}" class="megContent">
          {{ message.content }}
        </div>
        <div class="sendTime" :style="{opacity: timeColor, color: timeColor}">
          {{ time }}
        </div>
      </div>
    </div>
    <div
      class="announce"
      v-else
    >
      <div class="announceMeg">
        {{ message.message }}
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../../bus';
import CHAT from '../../socket';

export default {
  props: ['message'],
  data() {
    return {
      CHAT,
      url: 'http://39.97.113.252:5000',
      username: '',
      floatRight: 'left',
      flexDirect: 'unset',
      fontColor: 'rgb(135,136,148)',
      megBgc: 'rgb(245,246,250)',
      timeOpacity: '1',
      timeColor: '#aaa',
      showPic: true,
      time: '',
    };
  },
  computed: {
    icon: {
      get() {
        let url;
        if (this.CHAT.user.uid === this.message.uid) {
          url = this.CHAT.user.icon;
        } else if (this.message.uid === undefined) {
          url = '';
        } else if (this.CHAT.groupMember[this.message.uid] === null) {
          // 去请求该用户信息
          this.CHAT.getOtherUser(this.message.uid);
        } else if (this.CHAT.groupMember[this.message.uid] !== undefined) {
          url = this.CHAT.groupMember[this.message.uid].icon;
        }
        // console.log(1);
        return this.url + url;
      },
      set() {
        this.url = 'http://39.97.113.252:8080';
      },
    },
    name: {
      get() {
        let username = '';
        // eslint-disable-next-line max-len
        if (this.message.uid !== undefined && this.CHAT.user.uid !== this.message.uid && this.CHAT.groupMember[this.message.uid] !== undefined) {
          username = this.CHAT.groupMember[this.message.uid].name;
        }
        return this.username + username;
      },
      set() {
        this.username += ' ';
      },
    },
  },
  mounted() {
    if (this.message.uid === this.CHAT.user.uid) {
      this.floatRight = 'right';
      this.flexDirect = 'row-reverse';
      this.fontColor = 'white';
      this.megBgc = 'rgb(1,118,255)';
      this.timeOpacity = '0.85';
      this.timeColor = '#d5d5d5';
    // eslint-disable-next-line max-len
    } else if (this.CHAT.groupMember[this.message.uid] === undefined && this.message.uid !== undefined) {
      // 去请求其他成员的信息
      // console.log(this.message.uid);
      CHAT.getOtherUser(this.message.uid);
    }
    if (this.message.url === null) {
      this.showPic = false;
    }

    this.time = this.$moment().utc(Number(this.message.time) * 1000).format('lll');
    // console.log(this.time);

    // 消息已添加 scroll划到底部
    bus.$emit('scroll_bottom');
  },
  created() {
    bus.$on('other_user', (data) => {
      this.icon = data.icon;
      this.name = data.name;
    });
  },
  beforeDestroy() {
    bus.$off('other_user');
  },
};
</script>

<style scoped>

  img {
    height: 100%;
  }

  .cover {
    width: 95%;
  }

  .cover .announce {
    width: 100%;
    float: left;
    margin: 0 auto;
    margin-top: 10px;
    text-align: center;
    color: #ddd;
  }

  .announce .announceMeg {
    max-width: 30%;
    margin: 0 auto;
    border-radius: 10px;
  }

  .cover .message {
    max-width: 45%;
    display: flex;
    clear: both;
    margin-top: 2%;
    word-break: break-all;
  }
  .message .pic {
    width: 5vh;
    height: 5vh;
    border-radius: 50%;
    overflow: hidden;
    margin-top: 1%;
    margin-left: 1vw;
    align-self: flex-end;
    /* 防止头像被压缩 */
    flex-shrink: 0;
  }

  .message .meg {
    margin-left: 1vw;
    border-bottom-left-radius: 0;
    border-radius: 9px;
    align-self: flex-start;
    padding-left: 1.2vw;
    padding-right: 1.2vw;
    /* display: flex;
    flex-wrap: wrap;
    justify-content: left; */
      display: grid;
      grid-area: 'a'
                 'b'
                 'c'
                 'd';
  }

  .meg .name {
    text-align: left;
    font-size: 20px;
    font-weight: bolder;
  }

  .meg .megContent {
    text-align: left;
    align-self: flex-end;
    line-height: 2.2em;
  }

  .meg .img {
    /* margin: 0 auto; */
    margin-top: 10px;
    margin-bottom: 10px;
    max-width: 32vh;
  }

  .img img {
    width: 100%;
  }

  .meg .sendTime {
    flex-shrink: 0;
    text-align: left;
    margin-bottom: 10px;
    font-size: 0.9em;
  }

</style>
