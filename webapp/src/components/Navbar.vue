<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <!-- Title -->
    <router-link
      class="navbar-brand"
      to="/"
    >
      STUDENTFRIDGE
    </router-link>
    <!-- Menu toggler for small screens -->
    <button
      id="navbar-toggle-btn"
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <!-- Navbar content -->
    <div
      id="navbarSupportedContent"
      class="collapse navbar-collapse"
    >
      <ul class="navbar-nav">
        <!-- Log in button -->
        <li
          v-if="!user"
          class="nav-item"
        >
          <router-link
            class="nav-link"
            to="/auth/signin"
          >
            Se connecter
          </router-link>
        </li>
        <!-- Log out button -->
        <li
          v-if="user"
          class="nav-item nav-link"
        >
          Bonjour {{ user.username }}
        </li>
        <li
          v-if="user"
          class="nav-item"
        >
          <span
            class="nav-link disconnect-btn"
            @click="disconnect"
          >Déconnexion
          </span>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
export default {
  name: 'Navbar',
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  mounted(){
    // handle clicks outside of navbar to close it
    window.addEventListener('click', (event) => {
      // if the click is located outside of the navbar and the navbar is visible
      if (event.target.className.indexOf('navbar-toggler-icon') < 0
        && event.target.className.indexOf('navbar-toggle-btn') < 0
        && document.getElementById('navbarSupportedContent').className.indexOf('show') >= 0){
        document.getElementById('navbar-toggle-btn').click();
      }
    })
  },
  methods: {
    disconnect () {
      // tell the api to log the user out
      axios.delete('/auth/signout/')
        .then(() => {
          // delete the user from the store
          this.$store.commit('setUser', null);
        })
        .catch((err) => {
          this.$snotify.error(err.response.data.message, 'Erreur !', { timeout: 5000 });
        });
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.368);
  z-index: 999;
}

.nav-link {
  color: white !important;
}

.title {
  font-size: 23px;
}
.disconnect-btn:hover {
  cursor: pointer;
}
</style>