<template>
  <div class="profile">
    <header>
      <div class="logo">
        <h2>Profile</h2>
      </div>
      <div class="search">
        <input type="text" placeholder="Search for Messages or users...">
        <i class="fa fa-search"></i>
      </div>
    </header>
    <div class="infoShow">
      <div class="mainInfo">
        <div class="blank"></div>
        <div class="userpic">
          <img src="https://pic3.zhimg.com/v2-c073bf0fa922e7c131d070a79cb933dd_is.jpg">
        </div>
        <h3 class="username">azoux</h3>
        <div class="sayings">
          <p>究竟爱一个人，可以到什么程度？究竟什么样的邂逅，可以舍命不悔？逻辑的尽头不是理性和秩序的理想国，而是我用生命奉献的爱情！</p>
        </div>
        <div class="blank" style="height: 4.5vh;"></div>
      </div>
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
</template>

<script>
import profileItem from './userProfileItem.vue';

export default {
  components: {
    profileItem,
  },
  data() {
    return {
      profileItems: [
        {
          itemName: 'country',
          itemContent: 'China',
          itemIcon: 'fa fa-globe fa-fw',
          showLine: 1,
        },
        {
          itemName: 'phone',
          itemContent: '+110 110 110',
          itemIcon: 'fa fa-microphone fa-fw',
          showLine: 1,
        },
        {
          itemName: 'email',
          itemContent: 'you@you.com',
          itemIcon: 'fa fa-envelope-o fa-fw',
          showLine: 1,
        },
        {
          itemName: 'time',
          itemContent: '2020/03/27',
          itemIcon: 'fa fa-clock-o fa-fw',
          showLine: 0,
        },
      ],
    };
  },
};
</script>

<style scoped>
  input {
    outline: none;
    border: none;
  }

  .blank {
    width: 2px;
    height: 2vh;
  }

  header {
    width: 90%;
    /* background-color: skyblue; */
    margin: 0 auto;
  }

  header .logo {
    text-align: left;
    padding-top: 2vh;
  }

  .logo h2 {
    font-size: 1.8em;
  }

  header .search {
    width: 100%;
    height: 50px;
    margin-top: 10px;
    border-radius: 10px;
    background-color: rgb(237,238,246);
  }

  .search input {
    width: 90%;
    height: 100%;
    background-color:rgb(237,238,246);
  }

  .search i {
    cursor: pointer;
  }

  .infoShow {
    width: 90%;
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
  }

   .infoShow .otherInfo {
    margin-top: 28px;
    border-radius: 10px;
    background-color:#fff;
  }
</style>
