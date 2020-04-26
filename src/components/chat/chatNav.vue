<template>
  <nav>
    <div class="groupInfo">
      <div class="picInfo">
        <img :src="'http://39.97.113.252:8080' + CHAT.roomInfo.icon">
      </div>
      <div class="textInfo">
        <h3>{{ CHAT.roomInfo.name }}</h3>
        <p>{{ CHAT.onlineUserCount }} Members ~ {{ CHAT.roomInfo.topic }}</p>
      </div>
    </div>
    <div class="operator userSelect">
      <div class="search" @click="searchShow">
        <i class="fa fa-search fa-lg"></i>
      </div>
      <div class="share" @click="showShare">
        <i class="fa fa-user-plus fa-lg"></i>
      </div>
      <div class="moreOp" @click="moreOpShow">
        <i class="fa fa-ellipsis-v fa-lg"></i>
      </div>
        <div class="moreOp-more" v-show="showMoreOPtion">
          <div class="mute" @click="showMute">
            <span>Mute</span>
            <i class="fa fa-sliders fa-lg"></i>
          </div>
          <div class="delete" @click="deleteChat">
            <span>Delete</span>
            <i class="fa fa-trash-o fa-lg"></i>
          </div>
        </div>
    </div>
  </nav>
</template>

<script>
import bus from '../../bus';
import CHAT from '../../socket';

export default {
  data() {
    return {
      showMoreOPtion: false,
      CHAT,
    };
  },
  methods: {
    deleteChat() {
      bus.$emit('check_delete_room');
    },
    sure2Delete() {
      this.CHAT.fireGroup();
    },
    searchShow() {
      // close moreOp
      this.showMoreOPtion = false;
      bus.$emit('search_show');
    },
    moreOpShow() {
      // close search
      if (this.$parent.$children[1].searchShow === true) {
        this.searchShow();
      }
      this.showMoreOPtion = !this.showMoreOPtion;
    },
    showSide() {
      bus.$emit('side_show');
    },
    showShare() {
      this.showMoreOPtion = false;
      this.showSide();
      bus.$emit('share_show');
    },
    showMute() {
      this.showSide();
      bus.$emit('mute_show');
      this.showMoreOPtion = false;
    },
  },
  mounted() {
    bus.$on('sure_delete_room', this.sure2Delete);
  },
  beforeDestroy() {
    bus.$off('sure_delete_room');
  },
};
</script>

<style scoped>
  nav {
    border-bottom: 1px #e8e8e8 solid;
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  nav .groupInfo {
    width: 40%;
    margin-left: 3%;
    display: flex;
  }

  .groupInfo .picInfo {
    width: 5.5vh;
    height: 5.5vh;
    border-radius: 50%;
    overflow: hidden;
    margin-top: 1%;
  }

  .picInfo img {
    height: 100%;
  }

  .groupInfo .textInfo {
    text-align: left;
    margin-left: 2%;
    padding-top: 1.5%;
  }

  .textInfo p {
    padding-top: 2%;
    color: rgb(178,183,189);
    font-size: 0.8em;
    white-space: nowrap;
  }

  nav .operator {
    width: 8%;
    margin-right: 5%;
    display: flex;
    justify-content: space-between;
    position: relative;
  }

  .operator i {
    cursor: pointer;
    color: #b3b3b3;
  }

  i:hover {
    color: rgb(1,118,255);
  }

  .operator .moreOp-more {
    position: absolute;
    left: 0;
    top: 3vh;
    padding: 1.5vh;
    border: 1px solid #e8e8e8;
    border-radius: 10px;
    background-color: #fff;
    text-align: left;
    z-index: 999;
  }
  .moreOp-more .mute {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }

  .moreOp-more .delete {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    margin-top: 2vh;
  }

  .moreOp-more span {
    padding-right: 2px;
  }

  .moreOp-more i {
    display: inline-block;
    padding-left: 2vh;
  }

  .userSelect {
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
</style>
