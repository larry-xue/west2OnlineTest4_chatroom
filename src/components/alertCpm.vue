<template>
  <div class="main">
    <div class="alert">
      <div class="title">{{ alertTitle[1] }}</div>
      <div class="content">{{ alertInfo.content }}</div>
      <div class="checkBtn">
        <div class="cancle" @click="nonono">取消</div>
        <div class="sure" @click="justDoIt">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
// 提示框需要的一个对象
// { title： '0/1' ,content; 'ssss',  event: ''(可选)}
// title：提示名
// content： 内容
// event： 确认之后要触发的事件
import bus from '../bus';

export default {
  props: ['alertInfo'],
  methods: {
    delAlert() {
      this.$parent.showAlert = false;
    },
    justDoIt() {
      if (this.alertInfo.event === 'change_group') {
        bus.$emit('change_group');
        bus.$emit('dont_show_alert');
      }
      if (this.alertInfo.event === 'change_group_success') {
        bus.$emit('dont_show_alert');
      }
      if (this.alertInfo.event === 'empty_group') {
        bus.$emit('dont_show_alert');
      }

      if (this.alertInfo.event === 'update_userInfo') {
        bus.$emit('dont_show_alert');
      }

      if (this.alertInfo.event === 'fail_userInfo') {
        bus.$emit('dont_show_alert');
      }

      if (this.alertInfo.event === 'check_delete') {
        bus.$emit('sure_delete_room');
      }
    },
    nonono() {
      bus.$emit('dont_show_alert');
    },
  },
  data() {
    return {
      alertTitle: ['警告', '提示'],
    };
  },
};
</script>

<style scoped>
/* 整一个opacity 0.7 - 0 动画 */
/* 和提示框渐消opacity 1.0 - 0 */

  .main {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .alert {
    width: 400px;
    height: 200px;
    background-color: rgb(249,249,249);
    position:fixed;
    top:0;
    right:0;
    left:0;
    bottom:0;
    margin:auto;
    border-radius: 20px;
    /* opacity: 0.9; */
    /* animation: fadeBgc 3.5s ease-in forwards; */
  }

  .alert .title {
    margin-left: 170px;
    margin-top: 20px;
    color: rgb(32,32,32);
    font-size: 22px;
    font-weight:900;
    float: left;
  }

  .alert .content {
    width: 300px;
    height: 60px;
    float: left;
    margin-left: 40px;
    margin-top: 10px;
    font-size: 16px;
    text-align: center;
    color: rgb(111,111,111);
    word-break: break-all;
  }

  .alert .checkBtn {
    width: 400px;
    height: 60px;
    float: left;
    margin-top: 10px;
    border-top: 1px solid #ddd;
    font-size: 22px;
    color: #33A1C9;
    cursor: pointer;
  }

  .cancle:hover {
    text-shadow:0px 0px 0.9px #0000FF;
  }

  .sure:hover {
    text-shadow:0px 0px 0.9px #0000FF;
  }

  .checkBtn .cancle {
    width: 200%;
    height: 100%;
    float: left;
    width: 199px;
    line-height: 60px;
  }

  .checkBtn .sure {
    width: 199px;
    height: 100%;
    float: left;
    border-left: 1px solid #ddd;
    line-height: 60px;
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
