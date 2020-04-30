<template>
<!--
   这部分分为三个part ：nav， Groupinfo，bottom
   用v-show根据每次的点击展示对应块
 -->

  <div class="main">
    <nav>
      <i class="fa fa-chevron-left fa-lg" @click="closeSide"></i>
    </nav>

    <!-- groupInfo -->
    <div class="share" v-show="shareShow">
      <div class="simpleInfo">
        <div class="groupPic">
          <img :src="'http://39.97.113.252:8080' + CHAT.roomInfo.icon">
        </div>
        <div class="textInfo">
          <div class="groupName">
            <h3>{{ CHAT.roomInfo.name }}</h3>
          </div>
          <div class="shareLink" @click="copy">
            {{ CHAT.roomInfo.url }}
          </div>
        </div>
        <i class="fa fa-paperclip"></i>
      </div>
      <div class="groupIntro">
        {{ CHAT.roomInfo.describe }}
    </div>
   </div>

    <div class="mute" v-show="muteShow">
      <div class="groupInfo">
        <div class="groupPic">
          <img :src="'http://39.97.113.252:8080' + CHAT.roomInfo.icon">
        </div>
        <div>
          <h2>{{ CHAT.roomInfo.name }}</h2>
        </div>
        <div class="groupTopic">
          {{ CHAT.roomInfo.topic }}
        </div>
      </div>
    </div>

   <!-- bottom -->
   <div class="bottomPart">
     <div class="shareMethod" v-show="shareShow">
       <ul>
         <li
          v-for="item in shareMethod"
          :key='item.name'
         >
          <div class="methodName">{{ item.name }}</div>
          <i :class="item.classStyle"></i>
         </li>
       </ul>
     </div>

     <div class="muteBottom" v-show="muteShow">
       <div class="editPicTitle">
         Photo
       </div>
       <uploadAndShowPic></uploadAndShowPic>
       <!-- <normalSettingItem
        v-for="(item, index) in editItem"
        :key="index"
        :settingItem="item"
       ></normalSettingItem> -->
       <div class="editGroupName">
         <p>Name</p>
          <div class="inputbox">
           <input
            class="editGroupInput"
            type="text"
            :value="CHAT.roomInfo.name"
            maxlength="25"
           >
          </div>
       </div>
       <div class="editGroupTopic">
         <p>Topic (optional)</p>
          <div class="inputbox">
           <input
            class="editGroupInput"
            type="text"
            :value="CHAT.roomInfo.topic"
            maxlength="25"
           >
          </div>
       </div>
       <div class="textarea">
         <p>Description</p>
         <textarea
          maxlength="123"
          :value='CHAT.roomInfo.describe'
          class="editGroupInput"
         >
         </textarea>
       </div>
       <div class="submitBtn" @click="submitChange">submit</div>
     </div>
   </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard';
import bus from '../../bus';
import CHAT from '../../socket';
import uploadAndShowPic from '../uploadAndShowImg.vue';
// import normalSettingItem from '../normalSettingItem.vue';

export default {
  components: {
    uploadAndShowPic,
    // normalSettingItem,
  },
  data() {
    return {
      CHAT,
      shareShow: false,
      muteShow: false,
      shareMethod: [
        {
          api: 'url',
          name: 'qq',
          classStyle: 'fa fa-qq',
        },
        {
          api: 'url',
          name: 'wechat',
          classStyle: 'fa fa-wechat',
        },
        {
          api: 'url',
          name: 'weibo',
          classStyle: 'fa fa-weibo',
        },
      ],
    };
  },
  methods: {
    copy() {
      const clip = new Clipboard('.shareLink', {
        text() {
          return CHAT.roomInfo.url;
        },
        // 提示复制成功
      });
      clip.on('success', () => {
        // 释放内存
        clip.destroy();
      });
      clip.on('error', () => {
        clip.destroy();
      });
      bus.$emit('copy_success');
    },
    makeSure2Change() {
      const param = new FormData();
      const sendInfo = {};
      const input = document.getElementsByClassName('editGroupInput');
      sendInfo.name = input[0].value;
      sendInfo.topic = input[1].value;
      sendInfo.describe = input[2].value;
      Object.keys(sendInfo).forEach((key) => {
        param.append(key, sendInfo[key]);
      });

      const file = this.$children[0].$el.childNodes[2].files[0];

      // 通过append向form对象添加数据
      //    判断是否上传了图片
      if (JSON.stringify(sendInfo) !== '{}' || file !== undefined) {
        // 添加 rid
        sendInfo.rid = this.CHAT.roomInfo.rid;
        // 发送修改头像请求
        // 通过append向form对象添加数据
        if (file !== undefined) {
          param.append('folder', 'icon');
          param.append('file', file, file.name);
          this.$http.post('/api/files', param).then((response) => {
            const { url } = response.data.data;
            // 头像上传完之后拿到url 再发送创建群组请求
            // const url = `http://39.97.113.252:5000${response.data.data.url}`;
            sendInfo.icon = url;
            this.CHAT.changeGroupInfo(sendInfo);
          });
        } else {
          this.CHAT.changeGroupInfo(sendInfo);
        }
      }
      // 清空群头像
      const pic = this.$children[0].$el.childNodes[2];
      pic.value = '';
    },
    submitChange() {
      // 先弹出提示框 确认后再进行修改
      if (this.CHAT.user.uid !== this.CHAT.roomInfo.owner) {
        bus.$emit('refuse_change_room');
      } else {
        bus.$emit('check_change_group');
      }
    },
    showMute() {
      this.shareShow = false;
      this.muteShow = true;
    },
    showShare() {
      this.muteShow = false;
      this.shareShow = true;
    },
    closeSide() {
      bus.$emit('side_close');
    },
  },
  created() {
    bus.$on('mute_show', this.showMute);
    bus.$on('share_show', this.showShare);
    bus.$on('change_group', this.makeSure2Change);
  },
  beforeDestroy() {
    bus.$off('share_show');
    bus.$off('mute_show');
    bus.$off('change_group');
  },
};
</script>

<style scoped>
  img {
    height: 100%;
  }

  li {
    list-style-type: none;
    outline: none;
  }

  i:hover {
    color: rgb(0,108,255);
  }

  .main {
    width: 100%;
    height: 100%;
    border-left: 1px #e8e8e8 solid;
    background-color: rgb(245,246,250);
    overflow-x: none;
    overflow-y: scroll;
  }

  .main nav {
    width: 100%;
    height: 8%;
    margin: 0 auto;
    border-bottom: 1px #e8e8e8 solid;
    position: relative;
    display: flex;
    align-items: center;
    background-color: #fff;
  }

  nav i {
    position: absolute;
    left: 10%;
    color: #b3b3b3;
    cursor: pointer;
  }

  .main .share {
    width: 100%;
    height: 28%;
    background-color: #fff;
  }

  .share .simpleInfo {
    width: 90%;
    margin: 0 auto;
    padding-top: 20%;
    display: flex;
    justify-content: space-between;
  }

  .simpleInfo .groupPic {
    width: 5vh;
    height: 5vh;
    overflow: hidden;
    border-radius: 50%;
    margin-left: 5%;
    flex-shrink: 0;
    align-self: flex-end;
  }

  .simpleInfo .textInfo {
    width: 90%;
    margin-left: 8%;
    align-self: flex-end;

    line-height: 1.5em;
    text-align: left;
    white-space: nowrap;
    cursor: pointer;
    overflow: hidden;
  }

  .textInfo div {
    overflow: hidden;
  }

  .textInfo div:nth-child(2) {
    font-size: 0.9em;
  }

  .textInfo div:nth-child(2):hover {
    color: rgb(0,108,255);
  }

  .simpleInfo i {
    align-self: flex-end;
    margin-bottom: 1%;
    margin-right: 17%;
    cursor: pointer;
  }

  .share .groupIntro {
    width: 80%;
    height: 50%;
    margin: 0 auto;
    padding-top: 11%;
    line-height: 1.7em;
    color: #777;
    word-wrap: break-word;
    font-size: 0.9em;
    /* background-color: skyblue; */
  }

  .main .bottomPart {
    width: 100%;
  }

  .bottomPart .shareMethod {
    margin: 0 auto;
    margin-top: 1vh;
    width: 90%;
    padding-top: 6%;
    padding-bottom: 6%;
    border-radius: 10px;
    background-color: #fff;
  }

  .shareMethod ul {
    width: 100%;
    height: 90%;
  }

  .shareMethod ul li {
    width: 80%;
    height: 7vh;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    color: #999;
  }

  .shareMethod ul li:nth-last-child(1) {
    border: none;
  }

  li i {
    color: #ddd;
  }

  li div:hover {
    color: black;
  }

  .main .mute {
    width: 100%;
    height: 28%;
    background-color: #fff;
  }

  .mute .groupInfo {
    width: 90%;
    margin: 0 auto;
    padding-top: 10%;
  }

  .groupInfo .groupPic {
    width: 9vh;
    height: 9vh;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 50%;
  }

  .groupInfo div {
    width: 80%;
    margin: 0 auto;
    margin-top: 1.5vh;
  }

  .groupInfo div:nth-child(3) {
    font-size: 0.95em;
    line-height: 1.5em;
    /* font-weight: bold; */
    color: #aaa;
  }

  .bottomPart .muteBottom {
    width: 90%;
    box-sizing: border-box;
    margin: 0 auto;
  }

  .muteBottom .editPicTitle {
    padding-top: 1vh;
    color: #888;
    text-align: left;
    font-weight: bold;
  }

  .muteBottom p {
  margin-top: 1.5vh;
  text-align: left;
  color: #888;
  font-weight: bold;
}

  .inputbox {
    width: 100%;
    height: 60px;
    margin-top: 10px;
    border-radius: 10px;
    background-color: rgb(237,238,246);
    margin-top: 2vh;
}

  .inputbox input {
    width: 90%;
    height: 100%;
    margin-right: 6.5%;
    font-size: 15px;
    outline: none;
    border: none;
    background-color:rgb(237,238,246);
    float: right;
    font-family: 'Times New Roman', Times, serif;
}

  .muteBottom .textarea {
    width: 97%;
  }

  .textarea textarea {
    width: 100%;
    height: 90px;
    border: none;
    border-radius: 10px;
    background-color: rgb(237,238,246);
    margin-top: 2vh;
    outline: none;
    font-size: 17px;
    text-indent: 0.6em;
    line-height: 25px;
    resize: none;
    color: #444;
    font-family: 'Times New Roman', Times, serif;
  }

  .muteBottom .submitBtn {
    width: 48%;
    margin: 0 auto;
    margin-top: 1.5vh;
    border: none;
    color: white;
    font-size: 1em;
    line-height: 2em;
    background-color: rgb(1,113,245);
    cursor: pointer;
  }

  /* 滚动条 */
  ::-webkit-scrollbar {
    width:0.1px;
    background-color: white;
  }

  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    border-radius:10px;
    background:rgb(237,238,248);
  }
</style>
