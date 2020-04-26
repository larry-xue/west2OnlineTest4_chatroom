<template>
  <div class="info">
    <div class="detailItem">
      <p class="titleItem">
        {{ item.itemName }}
      </p>
      <i :class="item.itemIcon"></i>
      <p class="contentItem">
        {{ content }}
      </p>
      <div class="splitLine" v-if="item.showLine"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'contentValue'],
  computed: {
    content() {
      const name = this.item.itemName.toLowerCase();
      let val;
      if (name === 'time') {
        const date = new Date();
        val = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
        // console.log('time', date.getDay(), date);
      } else if (name === 'country') {
        val = 'China';
      } else {
        val = this.contentValue[name];
      }
      return val;
    },
  },
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
