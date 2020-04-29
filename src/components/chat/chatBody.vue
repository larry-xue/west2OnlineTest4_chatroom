<template>
  <div class="bodyMain">
    <!-- <picker title="Pick your emoji…" emoji="point_up" /> -->
    <!-- <picker set="emojione" /> -->
    <div class="search" v-show="searchShow">
      <searchCmp
        :rid="CHAT.roomInfo.rid"
      ></searchCmp>
      <div class="searchResult" v-if="show_search_result">
        <vue-scroll
          :ops="ops"
        >
          <ul>
            <li
              v-for="item in CHAT.searchList"
              :key="item.index"
            >
            <h3 class="searchName">{{ item.name }}:</h3>
            <p class="searchContent">content: {{ item.content }}</p>
            <p class="searchUrl">picurl: {{ item.url }}</p>
            <p class="searchTime">{{ item.time }}</p>
            </li>
          </ul>
        </vue-scroll>
      </div>
    </div>
    <div class="showMeg">
      <vue-scroll
        :ops="ops"
        slot="refresh-start"
        ref="body"
      >
        <div class="beforeMeg" @click="beforeMeglist">
          查看更早滴聊天记录
        </div>
        <megItem
          v-for="item in CHAT.megArr"
          :key="item.index"
          :message="item"
        ></megItem>
      </vue-scroll>
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
      ops: {
        vuescroll: {
          mode: 'native',
          sizeStrategy: 'percent',
          detectResize: true,
        },
        scrollPanel: {
          initialScrollY: '100%',
          scrollingY: true,
          scrollingX: false,
          speed: 200,
          easing: 'easeInOutQuart',
          verticalNativeBarPos: 'right',
          maxHeight: undefined,
          maxWidth: undefined,
        },
        rail: {
          background: '#01a99a',
          opacity: 0,
          size: '6px',
          gutterOfSide: '2px',
        },
        bar: {
          showDelay: 500,
          onlyShowBarOnScroll: true,
          keepShow: false,
          background: '#c1c1c1',
          opacity: 1,
          hoverStyle: false,
          specifyBorderRadius: false,
          minSize: false,
          size: '6px',
          disable: false,
        },
      },
      show_search_result: false,
      showEmojiPick: false,
      userInfo: '',
      content: '',
      searchShow: false,
    };
  },
  methods: {
    beforeMeglist() {
      // 消息回滚十条
      console.log(this.CHAT.megArr);
      if (this.CHAT.megArr[0].index > 0) {
        this.CHAT.getMegList(this.CHAT.roomInfo.rid, this.CHAT.megArr[0].index);
      } else {
        console.log(this.CHAT.megArr[0].index);
        // document.getElementsByClassName('alert')[0].click();
      }
    },
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
      // const showMeg = document.getElementsByClassName('showMeg')[0].childNodes[0];
      // showMeg.scrollTop = showMeg.scrollHeight;
      this.$refs.body.scrollTo(
        {
          y: '100%',
        },
        900,
      );
    },
    show_search() {
      this.searchShow = !this.searchShow;
    },
  },
  mounted() {
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
    bus.$on('show_search_result', () => {
      // this.show_search_result = false;
      this.show_search_result = true;
    });
  },
  beforeDestroy() {
    bus.$off('search_show');
    bus.$off('scroll_bottom');
    bus.$off('add_emoji');
    bus.$off('show_search_result');
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
    z-index: 9999;
    /* background-color: sandybrown; */
  }

  .search .searchResult {
    margin-top: 10px;
    background-color: #fff;
    opacity: 0.9;
    height: 300px;
    width: 100%;
    border: 1px solid #ccc;
    border-top: none;

    border-radius: 20px;
  }

  .searchResult ul {
    list-style: none;
    cursor: text;
  }

  .searchResult ul li {
    padding-top: 5px;
    padding-bottom: 5px;
    text-indent: 1em;
    transition: background-color 0.9s;
  }

  .searchResult ul li h3 {
    text-align: left;
  }

  .searchResult ul li p {
    word-wrap: break-word;
    padding-left: 2em;
    text-indent: 0;
    text-align: left;
  }

  .searchResult ul li:hover {
    opacity: 1;
    background-color: rgb(142,200,255);
  }

  .bodyMain .showMeg {
    width: 90%;
    height: 87%;
    margin: 0 auto;
    align-self: flex-start;
    overflow-x: hidden;
    overflow-y: scoll;
  }

  .showMeg .beforeMeg {
    width: 95%;
    float: left;
    margin: 0 auto;
    margin-top: 10px;
    text-align: center;
    cursor: pointer;
    transition: text-shadow 0.6s;
    color: cornflowerblue;
  }

  .beforeMeg:hover {
    text-shadow: .2rem 0rem .5rem
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

  /* ::-webkit-scrollbar {
    width:12px;
    background-color: white;
  } */

  /* 滚动槽 */
  /* ::-webkit-scrollbar-track {
    border-radius:10px;
  } */

  /* 滚动条滑块 */
  /* ::-webkit-scrollbar-thumb {
    border-radius:10px;
    background:rgb(237,238,248);
  } */


</style>
