<template>
  <div class="cover">
    <div class="message"
      :style="{float:floatRight, flexDirection: flexDirect}">
      <div class="pic">
        <img src="https://pic3.zhimg.com/v2-c073bf0fa922e7c131d070a79cb933dd_is.jpg" alt="">
      </div>
      <div class="meg" :style="{backgroundColor: megBgc}">
        <div :style="{color: fontColor}">
          {{ message.sendMeg }}
        </div>
        <div :style="{opacity: timeColor, color: timeColor}">
          {{ message.sendTime }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['message'],
  data() {
    return {
      floatRight: 'left',
      flexDirect: 'unset',
      fontColor: 'rgb(135,136,148)',
      megBgc: 'rgb(245,246,250)',
      timeOpacity: '1',
      timeColor: '#aaa',
    };
  },
  mounted() {
    if (this.message.sendId === '1111') {
      this.floatRight = 'right';
      this.flexDirect = 'row-reverse';
      this.fontColor = 'white';
      this.megBgc = 'rgb(1,118,255)';
      this.timeOpacity = '0.85';
      this.timeColor = '#d5d5d5';
    }
  },
};
</script>

<style scoped>

  .cover {
    width: 95%;
    background-color: sandybrown;
  }

  .cover .message {
    max-width: 50%;
    display: flex;
    clear: both;
    margin-top: 2%;
  }
  .message .pic {
    width: 5vh;
    height: 5vh;
    border-radius: 50%;
    overflow: hidden;
    margin-top: 1%;
    margin-left: 1vw;
    align-self: flex-end;
    /* 防止头像被压缩 */
    flex-shrink: 0;
  }

  .pic img {
    height: 100%;
  }

  .message .meg {
    margin-left: 1vw;
    border-bottom-left-radius: 0;
    border-radius: 9px;
    align-self: flex-start;
    padding-left: 1.2vw;
    padding-right: 1.2vw;

  }

  .meg div {
    text-align: left;
    line-height: 2.2em;
  }

  .meg div:nth-child(2) {
    font-size: 0.9em;
  }

</style>
