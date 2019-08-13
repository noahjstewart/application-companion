import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import CreateApplication from './views/CreateApplication.vue'
import Application from './views/Application.vue';

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
    },
    {
      path: '/applications/:id',
      name: 'application-view',
      component: Application
    }
  ]
})
