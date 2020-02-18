<template>
  <main>
    <!-- Landing picture -->
    <section class="landing-section">
      <div class="description-container text-center">
        <h2>Fini le gaspillage !</h2>
        <p class="description">
          Les yeux plus gros que le ventre ?
          <br />Partage avec d'autres étudiants !
        </p>

        <button
          v-if="deferredPrompt"
          class="btn btn-co"
          @click="installPWA"
        >Installe l'application !</button>
        <a
          v-else-if="!deferredPrompt && !user"
          class="btn btn-warning"
          href="/howtoinstall.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >Comment télécharger ?</a>
        <br />
        <router-link v-if="!user" to="/auth/signin" class="btn btn-co">Connecte-toi !</router-link>
      </div>
    </section>
    <!-- Show the content of the fridge -->
    <Products />
  </main>
</template>

<script>
import { mapState } from "vuex";
import Products from "../components/products/Products";
/* eslint-disable no-console */
export default {
  name: "HomePage",
  components: {
    Products
  },
  data: () => {
    return {
      deferredPrompt: null
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  created() {
    this.$store.dispatch("loadCurrentSession");
    this.$store.dispatch("loadProducts");
    // catch the event prompting the user to install the PWA
    window.addEventListener("beforeinstallprompt", e => {
      // prevent from opening
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
      // Update UI notify the user they can add to home screen
    });
  },
  methods: {
    installPWA() {
      if (!this.deferredPrompt) {
        return;
      }
      // Show the prompt
      this.deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      this.deferredPrompt.userChoice.then(choiceResult => {
        // if the user has accepted to install
        // remove the deferred prompt
        if (choiceResult.outcome === "accepted") {
          this.deferredPrompt = null;
        }
      });
    }
  }
};
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

.btn-co {
  background: #880d1e;
  font-size: medium;
  color: #eee0cb;
  border: #880d1e;
}
.btn-co:hover {
  background: #e06e4e;
  border: #880d1e;
}
.btn-co:active {
  background: #e06e4e;
  border: #880d1e;
}

.landing-section .btn {
  margin-bottom: 10px;
}
</style>