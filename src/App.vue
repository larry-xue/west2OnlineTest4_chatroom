<template>
  <div id="app">
    <div id="header">
      <div class="logo">
        <img src="../public/logo.png">
      </div>
      <nav>
        <i class="fa fa-pencil-square-o fa-2x" @click="show">
          <router-link to="/GroupCreate"></router-link>
        </i>
        <i class="fa fa-comment-o fa-2x">
          <div class="point"></div>
          <router-link to="/chat"></router-link>
        </i>
        <i class="fa fa-user-o fa-2x">
          <router-link to="/UserInfo"></router-link>
        </i>
        <i class="fa fa-gear fa-2x"></i>

        <!-- fa fa-send-o -->
      </nav>
    </div>
    <div class="splitLine"></div>
    <div class="content">
      <router-view to="datanow"></router-view>
    </div>
    <alertCpm :alertInfo="alertData" v-show="showAlert"></alertCpm>
  </div>
</template>

<script>
import bus from './bus';
import alertCpm from './components/alertCpm.vue';

export default {
  components: {
    alertCpm,
  },
  data() {
    return {
      datanow: '/chat',
      alertData: {
        content: 'Alert Test',
      },
      showAlert: false,
    };
  },
  methods: {
    show() {
      // this.datanow = 2;
    },
    send2Serve() {
      this.$socket.emit('login', {
        username: 'azou',
        password: 'password',
      });
    },
    receiveMeg() {
      this.sockets.subscribe('relogin', (data) => {
        console.log(data);
        console.log('yoyoyo');
      });
    },
  },
  created() {
    bus.$on('meg_send', this.send2Serve());
    bus.$on('receive_meg', this.receiveMeg());
    this.sockets.subscribe('createGroup', (data) => {
      console.log(data);
    });
  },
  beforeDestroy() {
    bus.$off('meg_send');
    bus.$off('receive_meg');
  },
  mounted() {
    this.$socket.emit('connect', 1);
  },
  sockets: {
    connect(data) {
      if (data) {
        console.log('连接connect', data);
      }
    },
    receive_meg(data) {
      console.log(data);
    },
    disconnect() {
      console.log('disconnect');
    },
    transferMessage(data) {
      console.log('transfer', data);
    },
  },
};
</script>

<style>

* {
  padding: 0;
  margin: 0;
}

i:hover {
  color: rgb(1,118,255);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}

#header {
  float: left;
  width: 8%;
  height: 100vh;
  background-color: rgb(255,255,255);
  /* border: 1px solid black; */
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 1fr 4fr;
}

router-link {
  width: 100px;
  height: 100px;
}

#header .logo {
  margin-top: 2vh;
}

#header nav {
  display: grid;
  grid-area: 'a'
             'b'
             'c'
             'd';
}

a {
  position: absolute;
  display: inline-block;
  width: 50%;
  height: 4vh;
  top: 0;
  left: 25%;
}

#header nav i {
  position: relative;
}

#header nav i:nth-child(1) {
  align-self: end;
  /* margin-bottom: 5vh; */
}

#header nav i:nth-child(2) {
  align-self: center;
  display: inline-block;
  /* margin-bottom: 5vh; */
}

#header nav i:nth-child(3) {
  align-self: start;
}

#header nav i:nth-child(4) {
  align-self: center;
}

#header nav .point {
  width: 8px;
  height: 8px;
  background-color: rgb(1,118,255);

  position: absolute;
  right: 49%;
  border-radius: 25px;
  bottom: -40%;
}

.splitLine {
  float: left;
  height: 100vh;
  width: 0.27%;
  background-color: rgb(245,246,250);
  /* margin-top: 3vh; */
}

.content {
  float: left;
  width: 91.5%;
  height: 100vh;
  /* margin-left: 0.2vw; */
}
</style>
