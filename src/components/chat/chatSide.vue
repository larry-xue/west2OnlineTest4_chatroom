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
          <img
            src="https://i0.hdslb.com/bfs/bangumi/image/ed4d64464f94c5bb4c474f5e1a5e1fce784c3c79.png@70w_70h_1c_100q.webp"
          >
        </div>
        <div class="textInfo">
          <div class="groupName">
            <h3>Group title</h3>
          </div>
          <div class="shareLink">
            www.bilibili.com/water/space
          </div>
        </div>
        <i class="fa fa-paperclip"></i>
      </div>
      <div class="groupIntro">
        a a sss s s sa w d dfas df dsv s哈哈哈 2 2 22快快快看看看看时代的粉色粉色平方米配色of配色发么欧式富
    </div>
   </div>

    <div class="mute" v-show="muteShow">
      <div class="groupInfo">
        <div class="groupPic">
          <img
            src="https://i0.hdslb.com/bfs/bangumi/image/d2f15ab77d21f978f426dbaa5cb5aaac430fc88c.jpg@70w_70h_1c_100q.webp"
          >
        </div>
        <div>
          <h2>Group name</h2>
        </div>
        <div class="groupTopic">
          #£££££££££££££££就好借好还开卡萨丁 撒大声地阿萨德阿达 I am a kind man ££££££££££?@:~
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
       <normalSettingItem
        v-for="(item, index) in editItem"
        :key="index"
        :settingItem="item"
       ></normalSettingItem>
       <div class="submitBtn">submit</div>
     </div>
   </div>
  </div>
</template>

<script>
import bus from '../../bus';
import uploadAndShowPic from '../uploadAndShowImg.vue';
import normalSettingItem from '../normalSettingItem.vue';

export default {
  components: {
    uploadAndShowPic,
    normalSettingItem,
  },
  data() {
    return {
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
      editItem: [
        {
          title: 'Name',
          placeholder: 'Group Name',
          maxlength: 25,
        },
        {
          title: 'Topic (optional)',
          placeholder: 'Group Topic',
          maxlength: 25,
        },
        {
          title: 'Description',
          placeholder: 'Group Description',
          maxlength: 50,
        },
      ],
    };
  },
  methods: {
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
  },
  beforeDestroy() {
    bus.$off('share_show');
    bus.$off('mute_show');
  },
};
</script>

<style scoped>
  img {
    width: 100%;
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
    max-height: 1vh;
    box-sizing: border-box;
    margin: 0 auto;
  }

  .muteBottom .editPicTitle {
    padding-top: 1vh;
    color: #888;
    text-align: left;
    font-weight: bold;
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
</style>
