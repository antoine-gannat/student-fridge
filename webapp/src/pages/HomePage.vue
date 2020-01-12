<template>
  <main>
    <!-- Landing picture -->
    <section class="landing-section">
      <div class="description-container text-center">
        <h2>Fini le gaspillage ! </h2>
        <p class="description">Les yeux plus gros que le ventre ?<br/> Partage avec d'autres étudiants !</p>
        <p>La vie est dure ? Notre frigo est là ! </p>
        <button
          class="btn btn-primary"
          v-if="deferredPrompt"
          @click="installPWA"
        >Installe l'application !</button>
        <router-link
          to="/auth/signup"
          class="btn btn-primary btn-co"
          v-else-if="!user"
        >Connecte-toi !</router-link>
      </div>
    </section>
    <!-- Show the content of the fridge -->
    <Products />
  </main>
</template>

<script>
import { mapState } from 'vuex';
import Products from '../components/products/Products';
/* eslint-disable no-console */
export default {
  name: 'HomePage',
  components: {
    Products
  },
  data: () => {
    return {
      deferredPrompt: null
    }
  },
  created () {
    // catch the event prompting the user to install the PWA
    window.addEventListener('beforeinstallprompt', (e) => {
      // prevent from opening
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
      // Update UI notify the user they can add to home screen
    })
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    installPWA () {
      if (!this.deferredPrompt) {
        return
      }
      // Show the prompt
      this.deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      this.deferredPrompt.userChoice
        .then((choiceResult) => {
          // if the user has accepted to install
          // remove the deferred prompt
          if (choiceResult.outcome === 'accepted') {
            this.deferredPrompt = null;
          }
        });
    }
  }
}
</script>

<style scoped>
.landing-section {
  height: 90vh;
  width: 100%;
  background: url(/img/stock.jpg) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  -webkit-box-shadow: inset -415px 45px 114px 37px rgba(0, 0, 0, 0.61);
  -moz-box-shadow: inset -415px 45px 114px 37px rgba(0, 0, 0, 0.61);
  box-shadow: inset -415px 45px 114px 37px rgba(0, 0, 0, 0.61);
}

.description-container {
  color: white;
  position: absolute;
  width: auto;
  padding: 1em;
  top: 40%;
  right: 20px;
  text-align: right;
}

.btn-co{
   background: #880D1E;
  font-size: medium;
  color: #EEE0CB;
  border: #880D1E;
}
.btn-co:hover{
  background: #E06E4E;
}

</style>