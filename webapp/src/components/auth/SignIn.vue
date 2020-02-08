<template>
  <div>
    <h3>Se connecter</h3>
    <form @submit.prevent="signIn">
      <div class="form-group">
        <input
          type="email"
          name="email"
          class="form-control"
          placeholder="Votre Email *"
          v-model="formEmail"
          required
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          name="password"
          class="form-control"
          placeholder="Votre Password *"
          v-model="formPassword"
          required
        />
      </div>
      <div class="form-group">
        <input
          type="submit"
          class="btn submit-btn btn-co"
          value="Connexion"
        />
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable no-console */
import axios from 'axios';

export default {
  name: "SignIn",
  data: () => {
    return {
      formEmail: '',
      formPassword: ''
    }
  },
  methods: {
    signIn () {
      axios.post('/auth/signin/', { email: this.formEmail, password: this.formPassword })
        .then((response) => {
          this.$store.commit('setUser', response.data.user);
          this.$router.push(this.$route.query.redirect || '/');
        }).catch((err) => {
          this.$snotify.error(err.response.data.message, 'Error !');
        });
    }
  }
};
</script>

<style scoped>
.forget-passwd-link {
  color: white !important;
}
.btn-co {
  background: #e06e4e;
  font-size: medium;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  color: #eee0cb;
  border: #880d1e;
}
.btn-co:hover {
  background: rgb(216, 90, 55);
}
.btn-co:active {
  background: #e06e4e;
  border: #880d1e;
}
</style>