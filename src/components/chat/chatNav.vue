<template>
  <nav>
    <div class="groupInfo">
      <div class="picInfo">
        <img src="https://pic3.zhimg.com/v2-c073bf0fa922e7c131d070a79cb933dd_is.jpg" alt="">
      </div>
      <div class="textInfo">
        <h3>group title</h3>
        <p>group information group information</p>
      </div>
    </div>
    <div class="operator">
      <div class="search" @click="searchShow">
        <i class="fa fa-search fa-2x"></i>
      </div>
      <div class="share">
        <i class="fa fa-user-plus fa-2x"></i>
      </div>
      <div class="moreOp">
        <i class="fa fa-ellipsis-v fa-2x" @click="showMoreOp"></i>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  methods: {
    showMoreOp() {
      this.$parent.showOp = !this.$parent.showOp;
    },
    searchShow() {
      this.$parent.$children[0].searchShow = !this.$parent.$children[0].searchShow;
      console.log(1);
    },
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
  }

  .operator i {
    cursor: pointer;
    color: #ccc;
  }

  i:hover {
    color: rgb(1,118,255);
  }
</style>
