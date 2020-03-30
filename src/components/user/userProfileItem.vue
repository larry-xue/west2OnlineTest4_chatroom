<template>
  <div class="info">
    <div class="detailItem">
      <p class="titleItem">
        {{ item.itemName }}
      </p>
      <i :class="item.itemIcon"></i>
      <p class="contentItem">
        {{ item.itemContent }}
      </p>
      <div class="splitLine" v-if="item.showLine"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
};
</script>

<style scoped>

  .splitLine {
    width: 98%;
    height: 1px;
    background-color: #efefef;
    margin-left: 1%;
    margin-top: 3vh;
  }

  .info {
    padding-top: 4.6vh;
    padding-bottom: 2vh;
  }

  .info .detailItem {
    width: 90%;
    margin: 0 auto;
    background-color: #fff;
    text-align: left;
    position: relative;
  }

  .info i {
    position: absolute;
    right: 0;
    top: 20%;
  }

  .info .titleItem {
    color: rgb(191,195,201);
    font-size: 14px;
  }

  .info .contentItem {
    margin-top: 0.8vh;
    color: rgb(155,175,183);
  }
</style>
