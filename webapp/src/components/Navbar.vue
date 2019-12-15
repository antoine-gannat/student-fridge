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
        <!-- Create an account button -->
        <li
          class="nav-item"
          v-if="!user"
        >
          <router-link
            class="nav-link"
            to="/auth/signup"
          >Créer un compte
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
      axios.delete('/api/auth/signout/')
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
  background-attachment: rgba(0, 0, 0, 0);
  -webkit-box-shadow: inset 0px 39px 71px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: inset 0px 39px 71px 0px rgba(0, 0, 0, 0.75);
  box-shadow: inset 0px 39px 71px 0px rgba(0, 0, 0, 0.75);
}

.title {
  font-size: 23px;
}
.disconnect-btn:hover {
  cursor: pointer;
}
</style>