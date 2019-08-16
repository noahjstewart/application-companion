import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './filters';
import './components';

import Notifications from 'vue-notification';

Vue.config.productionTip = false

Vue.prototype.$http = axios;
Vue.use(Notifications);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
