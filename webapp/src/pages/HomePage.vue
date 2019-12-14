<template>
  <main>
    <!-- Landing picture -->
    <section class="landing-section">
      <div class="description-container">
        <h2>Fini le gaspillage ! </h2>
        <p class="description">Les yeux plus gros que le ventre ? Partage avec d'autre étudiants !</p>
        <p>La vie est dure ? Notre frigo est là ! </p>
        <button
          class="btn btn-primary"
          v-if="deferredPrompt"
          @click="installPWA"
        >Installe l'application !</button>
        <router-link
          to="/auth/"
          class="btn btn-primary"
          v-else
        >Rejoins nous !</router-link>
      </div>
    </section>
    <section class="faq container">
      <h2>Qu'est-ce que quoi ?</h2>
    </section>
    <section class="menu container">
      <h2 class="mr-2">Au menu</h2>
      <AddProduct />
    </section>
  </main>
</template>

<script>
import AddProduct from '../components/AddProduct'
/* eslint-disable no-console */
export default {
  name: 'HomePage',
  components: {
    AddProduct
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

.faq {
  height: 500px;
}

.menu {
  height: 500px;
}
</style>