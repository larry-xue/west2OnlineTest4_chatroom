// 此组件是普通输入框组件，
// 接收一个对象，包括title placeholder maxlength
<template>
  <div class="normal">
    <p>{{ settingItem.title }}</p>
    <div class="inputbox">
      <input
        type="text"
        :placeholder="settingItem.placeholder"
        v-model.trim="userInput"
        :maxlength="settingItem.maxlength"
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ['settingItem'],
  data() {
    return {
      userInput: '',
    };
  },
};
</script>

<style scoped>

.normal {
  width: 97%;
  /* height: 14.6vh;
  margin-top: 1.4vh;
  border-radius: 10px;
  padding-top: 2vh;
  position: relative;
  background-color: rgb(237,238,246); */
}

.normal p {
  margin-top: 1.5vh;
  text-align: left;
  color: #888;
  font-weight: bold;
}

  .normal .inputbox {
    width: 100%;
    height: 60px;
    margin-top: 10px;
    border-radius: 10px;
    background-color: rgb(237,238,246);
    margin-top: 2vh;
}

  .inputbox input {
    width: 90%;
    height: 100%;
    font-size: 15px;
    outline: none;
    border: none;
    background-color:rgb(237,238,246);
    float: right;
    margin-right: 6.5%;
}
</style>
