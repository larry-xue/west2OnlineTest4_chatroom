<template>
  <div class="settings">
    <nav>
      <h2>Settings</h2>
      <p>Update your profile details</p>
    </nav>
    <div class="content">
      <vue-scroll
        :ops="ops"
      >
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
      </vue-scroll>
    </div>
    <div class="saveChange">
      <button @click="update">Save Preferences</button>
    </div>
  </div>
</template>

<script>
import userPicCmp from '../uploadAndShowImg.vue';
import normalSettingItem from '../normalSettingItem.vue';
import CHAT from '../../socket';
import bus from '../../bus';

export default {
  components: {
    userPicCmp,
    normalSettingItem,
  },
  data() {
    return {
      CHAT,
      ops: {
        vuescroll: {
          mode: 'native',
          sizeStrategy: 'percent',
          detectResize: true,
        },
        scrollPanel: {
          scrollingY: true,
          scrollingX: false,
          speed: 2000,
          easing: 'easeInOutQuart',
          verticalNativeBarPos: 'right',
          maxHeight: undefined,
          maxWidth: undefined,
        },
        rail: {
          background: '#01a99a',
          opacity: 0,
          size: '6px',
          gutterOfSide: '2px',
        },
        bar: {
          showDelay: 500,
          onlyShowBarOnScroll: true,
          keepShow: false,
          background: '#c1c1c1',
          opacity: 1,
          hoverStyle: false,
          specifyBorderRadius: false,
          minSize: false,
          size: '6px',
          disable: false,
        },
      },
      settingItemInfo: [
        {
          title: 'Name',
          placeholder: 'your name',
          maxlength: 15,
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
    uploadImg(param, file, upPic, sendInfo) {
      // 通过append向form对象添加数据
      upPic.append('folder', 'icon');
      upPic.append('file', file, file.name);
      this.$http.post('/api/files', upPic).then((response) => {
        // const url = `http://39.97.113.252:5000${response.data.data.url}`;
        // 本地存储url
        this.CHAT.user.icon = response.data.data.url;
        localStorage.setItem('userInfo', JSON.stringify(this.CHAT.user));
        // put用户信息
        param.append('icon', response.data.data.url);
        this.$http.put('/user', param).then((res) => {
          this.editInfoBack(res, sendInfo);
        }).catch(() => {
          // 通知修改失败
          bus.$emit('update_userInfo_fail');
        });
      });
    },

    // 用于返回之后的数据修改
    editInfoBack(response, sendInfo) {
      // 更新localstorage中的id & 直接用sendInfo修改profile中的数据 & 修改头像url
      //   localstorage
      const beforeData = JSON.parse(localStorage.getItem('userInfo'));
      let url;
      if (beforeData.icon !== this.CHAT.icon) {
        url = beforeData.icon;
      }
      const { data } = response.data;
      data.icon = url;
      data.uid = localStorage.getItem('uid');
      localStorage.setItem('userInfo', JSON.stringify(data));
      //   profile
      Object.keys(sendInfo).forEach((key) => {
        // profileItems  itemContent  其他信息需要另外修改
        if (key === 'phone' || key === 'email') {
          if (key === 'phone') {
            this.$parent.$children[0].profileItems[1].itemContent = sendInfo[key];
            this.CHAT.user[key] = sendInfo[key];
          } else if (key === 'email') {
            this.$parent.$children[0].profileItems[2].itemContent = sendInfo[key];
            this.CHAT.user[key] = sendInfo[key];
          }
        } else {
          // 修改面板
          this.CHAT.user[key] = sendInfo[key];
        }
      });
      // 提示修改成功
      this.CHAT.tellOtherUserInfo();
      bus.$emit('update_userInfo_success');
    },
    update() {
      // 获取用户输入的数据 (1---length-1)
      const child = this.$children[0].$children[0].$children;
      const sendInfo = {};
      for (let i = 1; i < child.length; i += 1) {
        if (child[i].userInput !== '') {
          sendInfo[child[i].$props.settingItem.title.toLowerCase()] = child[i].userInput;
        }
      }
      // 创建form对象
      const file = this.$children[0].$children[0].$children[0].$el.childNodes[2].files[0];
      const param = new FormData();

      // 通过append向form对象添加数据
      //    其他数据
      let testaramEmpyt = '';
      Object.keys(sendInfo).forEach((key) => {
        param.append(key, sendInfo[key]);
        testaramEmpyt = key;
      });

      //    判断是否上传了图片
      if (file !== undefined) {
        // 发送修改头像请求
        this.uploadImg(param, file, new FormData(), sendInfo);
      }

      // 判断是否只修改图片
      if (testaramEmpyt !== '' && file === undefined) {
        param.append('icon', this.CHAT.user.icon);
        this.$http.put('/user', param).then((response) => {
          this.editInfoBack(response, sendInfo);
        }).catch(() => {
          // 通知修改失败
          bus.$emit('update_userInfo_fail');
        });
      } else if (file !== undefined) {
        // 只有图片修改了
        bus.$emit('update_userInfo_success');
      }
    },
  },
};

</script>

<style scoped>

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
