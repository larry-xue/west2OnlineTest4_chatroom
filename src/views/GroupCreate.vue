<template>
  <div class="createGroup">
    <h1>Create group</h1>
    <div class="search">
      <searchCmp></searchCmp>
    </div>
    <div class="settings">
      <div class="userpic">
        <p>Photo</p>
        <update-photo></update-photo>
      </div>
      <normalSettingItem
        v-for="(item, index) in createItem"
        :key="index"
        :settingItem="item"
      ></normalSettingItem>
      <div class="submitBtn">
        <button @click="creatGroup">Create group</button>
      </div>
    </div>
  </div>
</template>

<script>
import searchCmp from '../components/searchCpm.vue';
import normalSettingItem from '../components/normalSettingItem.vue';
import updatePhoto from '../components/uploadAndShowImg.vue';
import CHAT from '../socket';
import bus from '../bus';

export default {
  components: {
    searchCmp,
    normalSettingItem,
    updatePhoto,
  },
  data() {
    return {
      CHAT,
      alertData: {
        content: 'asdasdasdasdasdasdsadasdasdasd',
      },
      createItem: [
        {
          title: 'Name',
          queryName: 'name',
          placeholder: 'Group Name',
          maxlength: 25,
        },
        {
          title: 'Topic (optional)',
          queryName: 'topic',
          placeholder: 'Group Topic',
          maxlength: 25,
        },
        {
          title: 'Description',
          queryName: 'describe',
          placeholder: 'Group Description',
          maxlength: 50,
        },
      ],
    };
  },
  methods: {
    creatGroup() {
      const param = new FormData();
      const child = this.$children;
      const sendInfo = {};
      for (let i = 2; i < child.length; i += 1) {
        if (child[i].userInput !== '') {
          sendInfo[child[i].$props.settingItem.queryName] = child[i].userInput;
        }
      }
      Object.keys(sendInfo).forEach((key) => {
        param.append(key, sendInfo[key]);
      });

      const file = this.$children[1].$el.childNodes[2].files[0];

      // 通过append向form对象添加数据
      //    判断是否上传了图片
      if (sendInfo.name !== undefined && sendInfo.name !== '') {
        // 发送修改头像请求
        // 通过append向form对象添加数据
        if (file !== undefined) {
          param.append('folder', 'icon');
          param.append('file', file, file.name);
          this.$http.post('/api/files', param).then((response) => {
            const { url } = response.data.data;
            // 头像上传完之后拿到url 再发送创建群组请求
            // const url = `http://39.97.113.252:5000${response.data.data.url}`;
            sendInfo.icon = url;
            this.CHAT.createGroup(sendInfo);
          });
        } else {
          this.CHAT.createGroup(sendInfo);
        }
      } else {
        // 提示至少输入名字
        bus.$emit('at_least_name');
      }
    },
  },
  mounted() {

  },
};
</script>

<style scoped>
  .createGroup {
    width: 90%;
    margin: 0 auto;
    text-align: left;
    position: relative;
  }

  .createGroup .settings {
    width: 60%;
    margin: 0 auto;
  }

  .settings .userpic {
    text-align: center;
    margin-top: 2.2vh;
  }

  .userpic p {
    text-align: left;
    font-weight: bold;
    color: #888;
  }

  .settings .submitBtn {
    width: 100%;
    height: 5vh;
    display: flex;
  }

  .submitBtn button {
    width: 48%;
    height: 5vh;
    margin: 0 auto;
    margin-top: 7vh;
    border: none;
    color: white;
    font-size: 15px;
    background-color: rgb(1,113,245);
    cursor: pointer;
  }
</style>
