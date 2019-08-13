import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import CreateApplication from './views/CreateApplication.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/applications/create',
      name: 'create-application',
      component: CreateApplication
    }
  ]
})
