import Vue from 'vue';
import '@babel/polyfill';
import 'font-awesome/css/font-awesome.css';
import VueSocketIO from 'vue-socket.io';
import VueLazyload from 'vue-lazyload';
import axios from 'axios';
import router from './router';
import App from './App.vue';
// import Bus from 'vue'

Vue.prototype.$http = axios;
axios.defaults.baseURL = 'http://39.97.113.252:5000';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

Vue.use(VueLazyload);

Vue.use(new VueSocketIO({
  debug: true,
  // serve
  connection: 'http://localhost:3000/',
}));

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
