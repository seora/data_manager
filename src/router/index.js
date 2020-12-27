import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home'

Vue.use(Router)

const Create = () => import ( '../view/Create.vue');
const SetTag = () => import ( '../view/SetTag.vue');

export default new Router({

  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/create',
      name: 'Create',
      component : Create
    },
    {
      path: '/setTag',
      name: 'SetTag',
      component : SetTag
    },
  ]
})