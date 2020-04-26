<template>
<div class="chatPage">
  <div class="main">
    <div class="nav">
      <chatNav></chatNav>
    </div>
    <div class="chatBody">
      <chatBody></chatBody>
    </div>
  </div>
  <div class="chatSide" v-show="showSide">
    <chatSide></chatSide>
  </div>
</div>
</template>

<script>
import chatNav from '../components/chat/chatNav.vue';
import chatBody from '../components/chat/chatBody.vue';
import chatSide from '../components/chat/chatSide.vue';
// import CHAT from '../socket';
import bus from '../bus';

export default {
  name: 'Chat',
  data() {
    return {
      showSide: false,
    };
  },
  components: {
    chatBody,
    chatSide,
    chatNav,
  },
  methods: {

  },
  created() {
    bus.$on('side_show', () => {
      this.showSide = true;
    });
    bus.$on('side_close', () => {
      this.showSide = false;
    });
  },
  beforeDestroy() {
    bus.$off('side_show');
    bus.$off('side_close');
  },
  mounted() {
  },

};
</script>

<style scoped>
  .chatPage {
    width: 100%;
    height: 100%;
    display: flex;
    /* background-color: red; */
  }

  .chatPage .main {
    width: 100%;
    /* flex-grow: 2; */
    flex-shrink: 100;
    height: 100%;
  }
  .main .nav {
    width: 100%;
    height: 8%;
  }

  .main .chatBody {
    width: 100%;
    height: 92%;
  }

  .chatPage .chatSide {
    width: 22%;
    height: 100%;
  }

</style>
