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
          <img :src="userInfo.picUrl">
        </div>
        <h3 class="username">{{ userInfo.name }}</h3>
        <div class="sayings">
          <p>{{ userInfo.autograpgh }}</p>
        </div>
        <div class="blank" style="height: 4.5vh;"></div>
      </div>
      <div class="otherInfoOuter">
        <div class="otherInfo">
          <ul>
            <profile-item
              v-for="(item, index) in profileItems"
              :key='index'
              :item='item'
            >
            </profile-item>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
        name: 'Azoux',
        autograpgh: '究竟爱一个人，可以到什么程度？究竟什么样的邂逅，可以舍命不悔？逻辑的尽头不是理性和秩序的理想国，而是我用生命奉献的爱情！',
        picUrl: '',
        phone: '+110 110 110',
        email: 'you@you.com',
        id: '',
      },
    };
  },
  created() {
    bus.$on('update_userPic', () => {
      const url = localStorage.getItem('picUrl');
      this.userInfo.picUrl = url;
    });

    // 从本地存储中读取头像和信息
    let userinfo = localStorage.getItem('userInfo');
    const picUrl = localStorage.getItem('picUrl');

    // console.log(userinfo);
    userinfo = JSON.parse(userinfo);
    // console.log(userinfo);

    Object.keys(userinfo).forEach((key) => {
      this.userInfo[key] = userinfo[key];
    });

    if (this.userInfo.phone !== null) {
      this.profileItems[1].itemContent = this.userInfo.phone;
    }

    if (this.userInfo.email !== null) {
      this.profileItems[2].itemContent = this.userInfo.email;
    }
    this.userInfo.picUrl = picUrl;
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
      overflow-x: hidden;
      overflow-y: scroll;
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
