<template>
  <div class="bodyMain">
    <!-- <picker title="Pick your emoji…" emoji="point_up" /> -->
    <!-- <picker set="emojione" /> -->
    <div class="search" v-show="searchShow">
      <searchCmp></searchCmp>
    </div>
    <picker
      title="Pick your emoji..."
      emoji="point_up"
      @select="addEmoji"
      style="display:none"
    />

    <div class="showMeg">
      <megItem
        v-for="(item, index) in chatMegs"
        :key="index"
        :message="item"
      ></megItem>
    </div>
    <div class="inputMeg">
      <div class="input">
        <input type="text" placeholder="Type your message...">
      </div>
      <div class="pickEmoji">
        <i class="fa fa-smile-o fa-2x"></i>
      </div>
      <div class="sendPic">
        <i class="fa fa-picture-o fa-2x"></i>
      </div>
      <div class="sendBtn">
        <i class="fa fa-send fa-2x"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { Picker } from 'emoji-mart-vue';
import megItem from './megItem.vue';
import searchCmp from '../searchCpm.vue';

export default {
  components: {
    Picker,
    megItem,
    searchCmp,
  },
  data() {
    return {
      content: '',
      searchShow: false,
      chatMegs: [
        {
          sender: 'azoux1',
          sendMeg: 'I am typeing...',
          sendId: '1111',
          picSrc: '#',
          sendTime: '',
        },
        {
          sender: 'azoux1',
          sendMeg: '有时候，一个人只要好好活着，就足以拯救某个人。 ——东野圭吾《嫌疑人X的献身》13、对于数学问题，自己想出答案和确认别人的答案是否正确，哪一个更简单，或者困难到何种程度，拟一个别人无法解答的问题和解开那个问题，何者更困难？',
          sendId: '123123',
          picSrc: '#',
          sendTime: '8 hours ago',
        },
        {
          sender: 'azoux1',
          sendMeg: '那些青春期的脆弱自尊，轻易不得触碰，那极有有可能成为对他或她一生的打扰。我们都曾经历那样纯粹、易碎的青春，只是时光的磨砺已让我们懂得逃避与忍气吞声然后慢慢遗忘自己曾经的青春。',
          sendId: '123123',
          picSrc: '#',
          sendTime: '8 hours ago',
        },
        {
          sender: 'azoux1',
          sendMeg: '夕阳在西边的天空渐渐散开。那下面巨大的高楼大厦鳞次栉比，不仅如此，它们周边还伫立着大大小小的建筑物。这就是怀有过野心和希望的人建造的街道。但是，现实当中，累得精疲力尽的人们只是在这些建筑物的缝隙之间匍匐打转地苟且偷生而已。而我，也只是其中的一个。 ——东野圭吾',
          sendId: '1111',
          picSrc: '#',
          sendTime: '8 hours ago',
        },
        {
          sender: 'azoux1',
          sendMeg: '夕阳在西边的天空渐渐散开。那下面巨大的高楼大厦鳞次栉比，不仅如此，它们周边还伫立着大大小小的建筑物。这就是怀有过野心和希望的人建造的街道。但是，现实当中，累得精疲力尽的人们只是在这些建筑物的缝隙之间匍匐打转地苟且偷生而已。而我，也只是其中的一个。 ——东野圭吾',
          sendId: '123123',
          picSrc: '#',
          sendTime: '8 hours ago',
        },
        {
          sender: 'azoux1',
          sendMeg: '我爱我的祖国，爱它的江河湖海，爱它的千峰百嶂，爱它每一刻带给我的小小感动，爱它多姿多彩的民俗风情。生于此，长于此，我无时无刻不热爱这片土地，爱它的繁华，也爱它的苍凉，沧海桑田化为琼楼玉宇，我只愿有朝一日，能乘风好去，长空万里，直下看山河。',
          sendId: '123123',
          picSrc: '#',
          sendTime: '8 hours ago',
        },
      ],
    };
  },
  methods: {
    addEmoji(e) {
      this.content += e.native;
    },
    scollBottom() {
      const showMeg = document.getElementsByClassName('showMeg')[0];
      showMeg.scrollTop = showMeg.scrollHeight;
    },
  },
  mounted() {
    const showMeg = document.getElementsByClassName('showMeg')[0];
    showMeg.scrollTop = showMeg.scrollHeight;
  },
};
</script>

<style scoped>
  .bodyMain {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    position: relative;
  }
  .bodyMain .search {
    width: 80%;
    height: 10%;
    position: absolute;
    top: 0;
    left: 10%;
    /* background-color: sandybrown; */
  }

  .bodyMain .showMeg {
    width: 90%;
    height: 87%;
    margin: 0 auto;
    align-self: flex-start;
    overflow-x: hidden;
    overflow-y: scoll;
  }

  .bodyMain .inputMeg {
    width: 100%;
    height: 10%;

    align-self: flex-end;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 3px solid rgb(245,246,250);
    /* background-color: saddlebrown; */
  }

  .inputMeg .input {
    width: 85%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .input input {
    width: 97%;
    height: 80%;
    border: none;
    outline: none;
    font-size: 1.2em;
  }

  .inputMeg .pickEmoji {
    color: #aaa;
    margin-right: 1%;
   }

   .inputMeg .sendPic {
    color: #aaa;
    margin-right: 1%;
   }

   .inputMeg .sendBtn {
     width: 6.5vh;
     height: 6.5vh;
     margin-right: 2%;

     display: flex;
     align-items: center;
     justify-content:space-around;
     border-radius: 50%;
     background-color: rgb(1,118,255);
     color: white;
   }

  .inputMeg i {
    cursor: pointer;
  }

  .sendBtn i {
    text-align: center;
  }

  .sendBtn i:hover {
    color: #ccc;
  }

  ::-webkit-scrollbar {
    width:12px;
    background-color: white;
  }

  /* 滚动槽 */
  ::-webkit-scrollbar-track {
    border-radius:10px;
  }

  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    border-radius:10px;
    background:rgb(237,238,248);
  }
</style>
