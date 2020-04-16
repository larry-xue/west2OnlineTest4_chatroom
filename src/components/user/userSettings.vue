<template>
  <div class="settings">
    <nav>
      <h2>Settings</h2>
      <p>Update your profile details</p>
    </nav>
    <div class="content">
      <div class="account">
        <h2>Account</h2>
        <p>Update your profile details</p>
        <i class="fa fa-user-o"></i>
      </div>
      <div class="userpic">
        <p class="itemtitle">Avatar</p>
        <userPicCmp></userPicCmp>
      </div>
      <div class="normalInfo">
        <normalSettingItem
          v-for="(item, index) in settingItemInfo"
          :key="index"
          :settingItem="item"
        >
      </normalSettingItem>
      </div>
    </div>
    <div class="saveChange">
      <button @click="update">Save Preferences</button>
    </div>
  </div>
</template>

<script>
import userPicCmp from '../uploadAndShowImg.vue';
import normalSettingItem from '../normalSettingItem.vue';
import bus from '../../bus';

export default {
  components: {
    userPicCmp,
    normalSettingItem,
  },
  data() {
    return {
      settingItemInfo: [
        {
          title: 'Name',
          placeholder: 'your name',
          maxlength: 10,
        },
        {
          title: 'Autograpgh',
          placeholder: 'write something about you..',
          maxlength: 50,
        },
        {
          title: 'Phone',
          placeholder: '+110 110 110',
          maxlength: 12,
        },
        {
          title: 'Email',
          placeholder: 'you@you.com',
          maxlength: 25,
        },
      ],
    };
  },
  methods: {
    uploadImg(param, file) {
      // 通过append向form对象添加数据
      param.append('folder', 'icon');
      param.append('file', file, file.name);
      this.$http.post('/api/files', param).then((response) => {
        const url = `http://39.97.113.252:5000${response.data.data.url}`;
        // 本地存储url
        localStorage.setItem('picUrl', url);
        console.log(111);
        bus.$emit('update_userPic');
      }).catch(() => {
      });
    },
    update() {
      // 获取用户输入的数据 (1---length-1)
      const child = this.$children;
      const sendInfo = {};
      for (let i = 1; i < child.length; i += 1) {
        if (child[i].userInput !== '') {
          sendInfo[child[i].$props.settingItem.title.toLowerCase()] = child[i].userInput;
        }
      }

      // 创建form对象
      const file = this.$children[0].$el.childNodes[2].files[0];
      const param = new FormData();

      // 通过append向form对象添加数据
      //    判断是否上传了图片
      if (file !== undefined) {
        // 发送修改头像请求
        this.uploadImg(param, file);
      }

      //    其他数据
      console.log(sendInfo);
      let testaramEmpyt = '';
      Object.keys(sendInfo).forEach((key) => {
        param.append(key, sendInfo[key]);
        testaramEmpyt = key;
      });
      // 判断是否只修改图片
      if (testaramEmpyt !== '') {
        this.$http.put('/user', param).then((response) => {
          // 更新localstorage中的id & 直接用sendInfo修改profile中的数据 & 修改头像url
          //   localstorage
          console.log(response);
          const data = JSON.stringify(response.data.data);
          localStorage.setItem('userInfo', data);
          //   profile
          Object.keys(sendInfo).forEach((key) => {
            // profileItems  itemContent  其他信息需要另外修改
            if (key === 'phone' || key === 'email') {
              if (key === 'phone') {
                this.$parent.$children[0].profileItems[1].itemContent = sendInfo[key];
              } else if (key === 'email') {
                this.$parent.$children[0].profileItems[2].itemContent = sendInfo[key];
              }
            } else {
              // 修改面板
              // console.log(key);
              this.$parent.$children[0].userInfo[key] = sendInfo[key];
            }
          });
        }).catch((err) => {
          console.log(err);
        });
      }
    },
  },

};

</script>

<style scoped>

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

  .settings {
    width: 100%;
    height: 100vh;
    background-color: #fff;
  }

  .settings nav {
    text-align: left;
    border-bottom: 1px rgb(245,246,251) solid;
    padding-top: 2vh;
    padding-bottom: 1vh;
    padding-left: 3%;
  }

  nav p {
    line-height: 3vh;
    color: rgb(187,192,197);
  }

  .settings .content {
    width: 80%;
    height: 65vh;
    margin: 0 5% 0 15%;
    overflow-x: hidden;
    overflow-y: scroll;
    /* background-color: #ccc; */

  }

  .content .account {
    width: 60%;
    margin-top: 2.5vh;
    margin-left: 2.5vw;
    padding-left: 1vw;
    padding-top: 1.4vh;
    padding-bottom: 2.4vh;
    border: #efefef 1px solid;
    border-radius: 10px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    text-align: left;
    position: relative;
  }

  .account p {
    color: #888;
    line-height: 3vh;
  }

  .account i {
    position: absolute;
    right: 4%;
    top: 40%;
  }

  .content .userpic {
    width: 60%;
    margin-left: 2.5vw;
    padding-left: 1vw;
    padding-top: 1.4vh;
    border: #efefef 1px solid;
    border-top: none;
    border-bottom: none;
  }

  .userpic .itemtitle {
    margin-top: 1.5vh;
    text-align: left;
    color: #888;
  }

  .content .normalInfo {
    width: 60%;
    margin-left: 2.5vw;
    padding-left: 1vw;
    padding-top: 1.4vh;
    border-left: #efefef 1px solid;
    border-right: #efefef 1px solid;
  }

  .settings .saveChange {
    width: 80%;
    height: 5vh;
  }

  .saveChange button {
    width: 48%;
    height: 5vh;
    margin: 0 5% 0 15%;
    margin-top: 7vh;
    border: none;
    color: white;
    font-size: 15px;
    background-color: rgb(1,113,245);
    cursor: pointer;
  }
</style>
