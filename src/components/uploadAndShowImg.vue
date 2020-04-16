<template>
  <div class="avatar">
    <div class="pic" :style="{ backgroundColor: picBgc}">
      <img
        :src="picsrc"
        :style="picsize"
      >
    </div>
    <p>
      You can upload jpg, gif or png files.<br>
      Max file size 3mb.
    </p>
    <input
      type="file"
      @change="updatePic"
      accept="image/png,image/gif,image/jpeg"
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      picsrc: require('../assets/pic.png'),
      picsize: {
        width: '40%',
        height: '',
        'object-fit': 'contain',
      },
      picBgc: 'rgb(1,118,255)',
    };
  },
  methods: {
    updatePic(source) {
      const file = source.target.files[0];
      if (window.FileReader) {
        const fr = new FileReader();
        console.log(fr);
        fr.onloadend = (e) => {
          this.picsrc = e.target.result;
          this.picsize.width = '';
          this.picsize.height = '100%';
        };
        fr.readAsDataURL(file);
      }
    },
  },
};
</script>

<style scoped>
.avatar {
  height: 100%;
  width: 97%;
  margin-top: 1.4vh;
  border-radius: 10px;
  padding-top: 2vh;
  padding-bottom: 1vh;
  position: relative;
  background-color: rgb(237,238,246);
}

.avatar .pic {
  width: 6vh;
  height: 6vh;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
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
