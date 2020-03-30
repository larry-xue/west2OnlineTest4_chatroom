import Vue from 'vue';
import '@babel/polyfill';
import 'font-awesome/css/font-awesome.css';
import axios from 'axios';
import router from './router';
import App from './App.vue';

Vue.prototype.$http = axios;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
