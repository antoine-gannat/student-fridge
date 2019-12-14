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
    <section class="faq">
      <h2 class="subtitle">Qu'estce que quoi ?</h2>
    </section>
    <section class="menu">
      <h2 class="subtitle">Au menu</h2>
    </section>
  </main>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: 'HomePage',
  data: () => {
    return {
      deferredPrompt: null
    }
  },
  created () {
    window.addEventListener('beforeinstallprompt', (e) => {
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
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          this.deferredPrompt = null;
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

.subtitle {
  position: absolute;
  left: 15%;
}

.faq {
  height: 500px;
}

.menu {
  height: auto;
}
</style>