<template>
  <div class="bodyMain">
    <!-- <picker title="Pick your emoji…" emoji="point_up" /> -->
    <!-- <picker set="emojione" /> -->
    <div class="search" v-show="searchShow">
      <searchCmp></searchCmp>
    </div>
    <div class="showMeg">
      <megItem
        v-for="(item, index) in CHAT.megArr"
        :key="index"
        :message="item"
      ></megItem>
    </div>
    <div class="inputMeg">
      <div class="input">
        <input
          type="text"
          placeholder="Type your message..."
          v-model='content'
          @keyup.enter="sendMeg"
        >
      </div>
      <div
        class="emojiPick"
        v-show="showEmojiPick"
      >
        <emojiPick></emojiPick>
      </div>
      <div
        @click="switchEmojiShow"
        class="pickEmoji"
      >
        <i class="fa fa-smile-o fa-2x"></i>
      </div>
      <div class="sendPic">
        <i class="fa fa-picture-o fa-2x">
          <input
            type="file"
            accept="image/png,image/gif,image/jpeg"
          >
        </i>
      </div>
      <div class="sendBtn" @click='sendMeg'>
        <i class="fa fa-send fa-2x"></i>
      </div>
    </div>
  </div>
</template>

<script>
import emojiPick from './emojiPick.vue';
import megItem from './megItem.vue';
import searchCmp from '../searchCpm.vue';
import CHAT from '../../socket';
import bus from '../../bus';

export default {
  components: {
    emojiPick,
    megItem,
    searchCmp,
  },
  data() {
    return {
      CHAT,
      showEmojiPick: false,
      userInfo: '',
      content: '',
      searchShow: false,
    };
  },
  methods: {
    switchEmojiShow() {
      this.showEmojiPick = !this.showEmojiPick;
    },
    sendMeg() {
      const file = document.getElementsByClassName('sendPic')[0].childNodes[0].childNodes[0].files[0];
      let picurl = '';
      let message;

      if (file !== undefined || this.content !== '') {
        const inputContent = this.content;

        if (file !== undefined) {
          const param = new FormData();
          param.append('folder', 'pic');
          param.append('file', file, file.name);
          this.$http.post('/api/files', param).then((response) => {
            picurl = 'http://39.97.113.252:5000';
            picurl += response.data.data.url;
            message = {
              rid: this.CHAT.roomInfo.rid,
              content: inputContent,
              url: picurl,
              type: 0,
              uid: this.CHAT.user.uid,
              typeName: 'message',
            };
            // 发送消息-----因为是异步的所以不得不放进去
            this.CHAT.sendMeg(message);
            // const url = `http://39.97.113.252:5000${response.data.data.url}`;
          });
        } else {
          message = {
            rid: this.CHAT.roomInfo.rid,
            content: inputContent,
            uid: this.CHAT.user.uid,
            type: 0,
            typeName: 'message',
          };
          // 发送消息
          this.CHAT.sendMeg(message);
        }
      }

      this.content = '';
      // 发送图片完成后清除
      const clearFile = document.getElementsByClassName('sendPic')[0].childNodes[0].childNodes[0];
      clearFile.value = '';
      this.showEmojiPick = false;
    },
    addEmoji(e) {
      this.content += e.native;
    },
    scollBottom() {
      const showMeg = document.getElementsByClassName('showMeg')[0];
      showMeg.scrollTop = showMeg.scrollHeight;
    },
    show_search() {
      this.searchShow = !this.searchShow;
    },
  },
  mounted() {
    this.scollBottom();
  },
  created() {
    // 获取用户信息
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.userInfo.url = localStorage.getItem('picUrl');
    bus.$on('add_emoji', (item) => {
      this.content += item;
    });
    bus.$on('search_show', this.show_search);
    bus.$on('scroll_bottom', this.scollBottom);
  },
  beforeDestroy() {
    bus.$off('search_show');
    bus.$off('scroll_bottom');
    bus.$off('add_emoji');
  },
};
</script>

<style scoped>
  .bodyMain {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    position: relative;
  }
  .bodyMain .search {
    width: 80%;
    height: 10%;
    position: absolute;
    top: 0;
    left: 10%;
    /* background-color: sandybrown; */
  }

  .bodyMain .showMeg {
    width: 90%;
    height: 87%;
    margin: 0 auto;
    align-self: flex-start;
    overflow-x: hidden;
    overflow-y: scoll;
  }

  .bodyMain .inputMeg {
    width: 100%;
    height: 10%;

    align-self: flex-end;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 3px solid rgb(245,246,250);
    position: relative;
    /* background-color: saddlebrown; */
  }

  .inputMeg .input {
    width: 85%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .input input {
    width: 97%;
    height: 80%;
    border: none;
    outline: none;
    font-size: 1.2em;
  }

  .inputMeg .emojiPick {
    position: absolute;
    width: 40%;
    height: 20vh;
    top: -230%;
    right: 10%;
    z-index: 9999;
    background-color: #eee;
  }

  .inputMeg .pickEmoji {
    margin-right: 1%;
    color: #aaa;
   }

   .inputMeg .sendPic {
    color: #aaa;
    margin-right: 1%;
   }

   .sendPic i {
     position: relative;
   }

   .sendPic i input {
     position: absolute;
     width: 100%;
     height: 100%;
     opacity: 0;
     top: 0;
     left: 0;
     font-size: 0;
     cursor: pointer;
   }

   .inputMeg .sendBtn {
     width: 6.5vh;
     height: 6.5vh;
     margin-right: 2%;

     display: flex;
     align-items: center;
     justify-content:space-around;
     border-radius: 50%;
     background-color: rgb(1,118,255);
     color: white;
   }

  .inputMeg i {
    cursor: pointer;
  }

  .sendBtn i {
    text-align: center;
  }

  .sendBtn i:hover {
    color: #ccc;
  }

  ::-webkit-scrollbar {
    width:12px;
    background-color: white;
  }

  /* 滚动槽 */
  ::-webkit-scrollbar-track {
    border-radius:10px;
  }

  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    border-radius:10px;
    background:rgb(237,238,248);
  }


</style>
