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
  <div class="chatSide" v-show="showOp">
    <chatSide></chatSide>
  </div>
</div>
</template>

<script>
import chatNav from '../components/chat/chatNav.vue';
import chatBody from '../components/chat/chatBody.vue';
import chatSide from '../components/chat/chatSide.vue';

export default {
  name: 'Chat',
  data() {
    return {
      showOp: false,
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
    console.log('chat created');
  },
  destroyed() {
    console.log('chat destroyed');
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
    width: 70%;
    flex-grow: 2;
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
    width: 20%;
    height: 100%;
    background-color: salmon;
  }

</style>
