import Vue from 'vue'
import App from './App'
import Snotify from 'vue-snotify';
// Import the store
import store from './store';
// Import the router
import router from './router';

// Vue snotify
Vue.use(Snotify);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
