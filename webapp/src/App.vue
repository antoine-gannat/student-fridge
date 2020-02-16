<template>
  <div id="app">
    <Navbar />
    <router-view></router-view>
    <vue-snotify></vue-snotify>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import {mapGetters} from 'vuex';

export default {
  name: "app",
  components: {
    Navbar
  },
  computed:{
    ...mapGetters(['swRegistration'])
  },
  mounted(){
    if (Notification.permission == 'granted') {
      navigator.serviceWorker.getRegistration().then(function(reg) {
        var options = {
          body: 'Merci d\'utiliser Student Fridge !',
          icon: 'img/icons/android-chrome-512x512.png',
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          }
        };
        reg.showNotification('Merci !', options);
      });
    }
  },
  watch:{
    swRegistration(registration){
      if (!registration){
        return
      }
      this.$snotify.confirm('Nouvelle version disponible..', 'Mise à jour !', {
        closeOnClick: false,
        buttons: [
          {text: 'Rafraichir', action: () => this.update(registration), bold: true},
          {text: 'Plus tard', action: (toast) => {this.$snotify.remove(toast.id); }},
        ]
      });
    }
  },
  methods:{
    update(registration) {
      const registrationWaiting = registration.waiting
      if (registrationWaiting) {
        // switch the service worker to 'active'
        // forcing it to get new content uppon next refresh
        registrationWaiting.postMessage({ type: 'SKIP_WAITING' });
        // once the message has been processed, refresh the page
        registrationWaiting.addEventListener('statechange', e => {
          if (e.target.state === 'activated') {
            // refresh
            window.location.reload();
          }
        })
      }
    }
  }
};
</script>

<style>
@import "~vue-snotify/styles/material.css";

#app {
  background:red;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* Add a padding top to avoid hidding elements behind the navbar */
}
</style>
