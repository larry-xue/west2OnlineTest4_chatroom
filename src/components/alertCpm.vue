<template>
  <div class="alert">
    <div class="inner">
      <p>
        {{ alertInfo.content }}
      </p>
      <div class="confirm">
        <button @click="delAlert">confirm</button>
      </div>
    </div>
  </div>
</template>

<script>
// 需要的数据，提示框多久消失，以及提示内容，提示的严重程度，
//      0（red - error） 1（yellow -- warn）2 （green -- tell）
export default {
  props: ['alertInfo'],
  methods: {
    delAlert() {
      this.$parent.showAlert = false;
    },
  },
};
</script>

<style scoped>
/* 整一个opacity 0.7 - 0 动画 */
/* 和提示框渐消opacity 1.0 - 0 */
  .alert {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    background-color: #ccc;
    opacity: 0.9;
    /* animation: fadeBgc 3.5s ease-in forwards; */
  }

  .alert .inner {
    width: 30%;
    height: 20%;
    background-color: #fff;
    align-self: center;
    margin: 0 auto;
    opacity: 1;
    font-weight: bolder;
    border-radius: 25px;
    /* animation: fadeInner 3.5s ease-in-out forwards; */
}

  .inner p {
    text-align: center;
    word-break: break-all;
    font-size: 3em;
    padding-top: 5%;
    color: yellowgreen;
  }

  .inner .confirm {
    width: 30%;
    height: 10%;
    margin: 0 auto;
    margin-top: 5%;
    /* background-color: rgb(0,103,255); */

  }

  .confirm button {
    padding: 1% 7% 1% 7%;
    font-size: 2em;
    color: white;
    border: none;
    outline: none;
    background-color: rgb(0,103,255);
    /* color: white; */
  }

  /* outer */
  @keyframes fadeBgc {
    0% {
      background-color: #ccc;
    }
    30% {
      background-color: #fff;
    }
    100% {
      background-color: #fff;
      opacity: 0;
    }
  }

  /* inner */
  @keyframes fadeInner {
    0% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
