<template>
  <div class="profile">
    <header>
      <div class="logo">
        <h2>Profile</h2>
      </div>
      <div class="search">
        <searchCmp></searchCmp>
      </div>
    </header>
    <div class="infoShow">
      <div class="mainInfo">
        <div class="blank"></div>
        <div class="userpic">
          <img :src="'http://39.97.113.252:5000'+CHAT.user.icon">
        </div>
        <h3 class="username">{{ CHAT.user.name }}</h3>
        <div class="sayings">
          <p>{{ CHAT.user.autograpgh }}</p>
        </div>
        <div class="blank" style="height: 4.5vh;"></div>
      </div>
      <div class="otherInfoOuter">
        <div class="otherInfo">
          <vue-scroll
           :ops="ops"
          >
            <ul>
              <profile-item
                v-for="(item, index) in profileItems"
                :key='index'
                :item='item'
                :contentValue='CHAT.user'
              >
              </profile-item>
            </ul>
          </vue-scroll>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CHAT from '../../socket';
import bus from '../../bus';

import profileItem from './userProfileItem.vue';
import searchCmp from '../searchCpm.vue';

export default {
  components: {
    profileItem,
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
      profileItems: [
        {
          itemName: 'Country',
          itemContent: 'China',
          itemIcon: 'fa fa-globe fa-fw',
          showLine: 1,
        },
        {
          itemName: 'Phone',
          itemContent: '+110 110 110',
          itemIcon: 'fa fa-microphone fa-fw',
          showLine: 1,
        },
        {
          itemName: 'Email',
          itemContent: 'you@you.com',
          itemIcon: 'fa fa-envelope-o fa-fw',
          showLine: 1,
        },
        {
          itemName: 'Time',
          itemContent: '2020/03/27',
          itemIcon: 'fa fa-clock-o fa-fw',
          showLine: 0,
        },
      ],
      userInfo: {
      },
    };
  },
  mounted() {
  },
  created() {
  },
  beforeDestory() {
    bus.$off('update_userPic');
  },
};
</script>

<style scoped>

  .blank {
    width: 2px;
    height: 2vh;
  }

  header {
    width: 90%;
    margin: 0 auto;
  }

  header .logo {
    text-align: left;
    padding-top: 2vh;
  }

  .logo h2 {
    font-size: 1.8em;
  }

  .infoShow {
    width: 90%;
    height: 80vh;
    margin: 0 auto;
    overflow: hidden;
  }

  .infoShow .mainInfo {
    margin-top: 28px;
    border-radius: 10px;
    background-color:#fff;
  }

  .mainInfo .userpic {
    height: 80px;
    width: 80px;
    border-radius: 90%;
    overflow: hidden;
    margin: 0 auto;
    margin-top: 20px;
  }

  .userpic img {
    height: 80px;
  }

  .mainInfo .username {
    margin-top: 15px;
  }

  .mainInfo .sayings {
    width: 80%;
    margin: 0 auto;
    margin-top: 12px;
    color: rgb(178,183,189);
    word-break:break-all;
  }

   .infoShow .otherInfoOuter {
     height: 75%;
   }

   .infoShow .otherInfo {
      height: 73%;
      margin-top: 28px;
      border-radius: 10px;
      background-color:#fff;
  }

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
