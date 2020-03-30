<template>
  <div class="userInfo">
    <div class="user-profile">
      <profile></profile>
    </div>
    <div class="user-settings">
      <settings></settings>
    </div>
  </div>
</template>

<script>
import profile from '../components/user/userProfile.vue';
import settings from '../components/user/userSettings.vue';

export default {
  components: {
    profile,
    settings,
  },
};
</script>

<style scoped>
  .userInfo {
    width: 100%;
    height: 100%;
  }

  .userInfo .user-profile {
    width: 26%;
    height: 100%;
    float: left;
    background-color: rgb(245,246,250);
  }

  .userInfo .user-settings {
    width: 74%;
    height: 100%;
    float: left;
    /* background-color: #aaa; */
  }
</style>
