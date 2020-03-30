<template>
  <div class="avatar">
    <div class="pic">
      <img
        :src="picsrc"
        :style="picsize"
        accept="image/png,image/gif,image/jpeg"
      >
    </div>
    <p>
      You can upload jpg, gif or png files.<br>
      Max file size 3mb.
    </p>
    <input type="file" @change="updatePic">
  </div>
</template>

<script>
export default {
  data() {
    return {
      picsrc: require('../assets/pic.png'),
      picsize: {
        width: '40%',
        objectFit: 'contain',
        paddingTop: '30%',
      },
    };
  },
  methods: {
    updatePic(e) {
      let src = '';
      if (e && window.FileReader) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
          src = reader.result;
        };
        this.picsize.width = '100%';
        this.picsize.paddingTop = '0%';
      } else {
        // 这里应弹出提示框 不支持fileReader
        src = require('../assets/pic.png');
      }
      this.picsrc = src;
      this.picsrc = 'https://i0.hdslb.com/bfs/bangumi/image/98f6f604e41a7b807e282b63beedda275db070e6.jpg@70w_70h_1c_100q.webp';
    },
  },
};
</script>

<style scoped>
.avatar {
  height: 14.6vh;
  width: 97%;
  margin-top: 1.4vh;
  border-radius: 10px;
  padding-top: 2vh;
  position: relative;
  background-color: rgb(237,238,246);
}

.avatar .pic {
  width: 6vh;
  height: 6vh;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
  background-color: rgb(1,118,255);
}

.pic img {
  padding-top: 30%;
  width: 40%;
}

.avatar p {
  font-size: 1.0em;
  color: rgb(178,183,189);
  margin-top: 2vh;
}

.avatar input {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
  top: 0;
  left: 0;
  opacity: 0;
  outline: none;
  cursor: pointer;
}
</style>
