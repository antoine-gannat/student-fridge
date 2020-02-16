import Vue from 'vue'
import App from './App.vue'
import Snotify from 'vue-snotify';
// Import the router
import router from './router';
// Import the store
import store from './store';
import './registerServiceWorker';

// Vue snotify
Vue.use(Snotify);

Vue.config.productionTip = false

// request notification permission
Notification.requestPermission(function(status) {
  console.log('Notification permission status:', status);
});

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
