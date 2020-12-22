import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home'

Vue.use(Router)

const Create = () => import ( '../view/Create.vue');

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
  ]
})
