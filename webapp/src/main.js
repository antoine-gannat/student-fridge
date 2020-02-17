import Vue from 'vue'
import App from './App.vue'
import Snotify from 'vue-snotify';
// Import the router
import router from './router';
// Import the store
import store from './store';
import axios from 'axios';
import './registerServiceWorker';

// Vue snotify
Vue.use(Snotify);

Vue.config.productionTip = false

// Notifications //

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function notificationSubscribe() {
  const publicVapidKey = 'BIRWU-EqbeIMc1KSnUE1pHp6S-Rc0sgjtudlyAiEzaoqcYeM__ja5vC4VGZNtG7IxaYvDQ23X_HQ8rYQMqLHHTY';
  if (Notification.permission == 'granted') {
    console.log("notificationSubscribe");
    navigator.serviceWorker.getRegistration().then(async (reg) => {
      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      });

      await axios.post('/api/notification/subscribe', subscription).catch((err) => {
        console.error("Failed to subscribe to notifications:", err.response.data)
      });
    });
  }
  else{
    console.error("Notification permission not granted")
  }
}
// request notification permission
Notification.requestPermission(function (status) {
  console.log('Notification permission status:', status);
  notificationSubscribe();
});

// //

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
