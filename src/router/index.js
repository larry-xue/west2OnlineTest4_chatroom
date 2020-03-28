import Vue from 'vue';
import VueRouter from 'vue-router';
import Chat from '../views/Chat.vue';
import UserInfo from '../views/UserInfo.vue';
import GroupCreate from '../views/GroupCreate.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/UserInfo',
  },
  {
    path: '/UserInfo',
    name: 'UserInfo',
    component: UserInfo,
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
  },
  {
    path: '/GroupCreate',
    name: 'Ch',
    component: GroupCreate,
  },

];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
