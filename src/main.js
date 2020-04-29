import Vue from 'vue';
import '@babel/polyfill';
import 'font-awesome/css/font-awesome.css';
import VueLazyload from 'vue-lazyload';
import vuescroll from 'vuescroll';
import axios from 'axios';
import moment from 'moment';
import router from './router';
import App from './App.vue';
// import Bus from 'vue'

Vue.prototype.$http = axios;
axios.defaults.baseURL = 'http://39.97.113.252:5000';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'form-data';
axios.defaults.withCredentials = true;

moment.locale('en');
Vue.prototype.$moment = moment;

Vue.use(VueLazyload);

Vue.use(vuescroll, {
  ops: {}, // 在这里设置全局默认配置
  name: 'vue-scroll', // 在这里自定义组件名字，默认是vueScroll
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
