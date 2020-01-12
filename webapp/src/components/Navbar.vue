<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <!-- Title -->
    <router-link
      class="navbar-brand"
      to="/"
    >STUDENTFRIDGE
    </router-link>
    <!-- Menu toggler for small screens -->
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <!-- Navbar content -->
    <div
      class="collapse navbar-collapse"
      id="navbarSupportedContent"
    >
      <ul class="navbar-nav">
        <!-- Log in button -->
        <li
          class="nav-item"
          v-if="!user"
        >
          <router-link
            class="nav-link"
            to="/auth/signin"
          >Se connecter
          </router-link>
        </li>
        <!-- Log out button -->
        <li
          class="nav-item nav-link"
          v-if="user"
        >Bonjour {{user.username}}</li>
        <li
          class="nav-item"
          v-if="user"
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