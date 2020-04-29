<template>
  <div class="searchCmp">
    <input
      type="text"
      placeholder="Search for Messages or users..."
      @keyup.enter="startSearch"
      v-model.trim="searchInput"
    >
    <i class="fa fa-search" @click="startSearch"></i>
  </div>
</template>

<script>
import CHAT from '../socket';
import bus from '../bus';

export default {
  props: ['rid'],
  data() {
    return {
      CHAT,
      searchInput: '',
    };
  },
  methods: {
    startSearch() {
      // 加一个rid区别另一个搜索框
      if (this.searchInput !== '' && this.rid) {
        this.$http.get('/search', {
          params: {
            rid: this.rid,
            args: this.searchInput,
          },
        }).then((res) => {
          this.CHAT.searchList = [];
          for (let i = 0; i <= res.data.messages.length - 1; i += 1) {
            const meg = res.data.messages[i];
            const time = Math.floor(Number(meg.time) * 1000);
            meg.time = this.$moment(time).format('YYYY/MM/DD HH:mm:ss');
            this.CHAT.searchList.push(meg);
          }
          // 发送展示信息消息
          bus.$emit('show_search_result');
        }).catch(() => {
        });
      }
    },
  },
};
</script>

<style scoped>
  input {
    outline: none;
    border: none;
  }

  .searchCmp {
    width: 100%;
    height: 50px;
    margin-top: 10px;
    border-radius: 10px;
    background-color: rgb(237,238,246);
    margin-top: 2vh;
    position: relative;
  }

  .searchCmp input {
    width: 90%;
    height: 100%;
    float: left;
    border-radius: 10px;
    padding-left: 1vw;
    font-size: 1.0em;
    background-color:rgb(237,238,246);
  }

  .searchCmp i {
    position: absolute;
    top: 30%;
    right: 2%;
    cursor: pointer;
  }
</style>
