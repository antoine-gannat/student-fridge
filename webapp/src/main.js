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
  const publicVapidKey = 'BNc4mbJHx5rwRVEoJf3xa7PVnsV9XvYZ38doiGq5vqoDD85RuJlNv-zselzFT64YxIfoT6aOH4sHUCxkJ4CDmZg';
  if (Notification.permission == 'granted') {
    console.log("notificationSubscribe");
    navigator.serviceWorker.getRegistration().then(async (reg) => {
      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      }).catch((err) => {
        reg.pushManager.getSubscription().then((sub) => {
          if (sub) {
            console.log("unsubscribe")
            sub.unsubscribe();
          }
        })
      });

      await axios.post('/api/notification/subscribe', subscription).catch((err) => {
        console.error("Failed to subscribe to notifications:", err.response.data)
      });
    });
  }
  else {
    console.error("Notification permission not granted")
  }
}

// //

new Vue({
  store,
  router,
  mounted() {
    // request notification permission
    if (Notification.permission !== 'granted') {
      console.log("asking notification permission");
      Notification.requestPermission(function (status) {
        console.log('Notification permission status:', status);
        notificationSubscribe();
      });
    }
  },
  render: h => h(App)
}).$mount('#app')
