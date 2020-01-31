<template>
  <div>
    <h3>Créer un compte</h3>
    <form @submit.prevent="signUp">
      <div class="form-group">
        <input
          name="email"
          type="text"
          class="form-control"
          placeholder="Votre Email *"
          v-model="email"
          required
        />
      </div>
      <div class="form-group">
        <input
          name="username"
          type="text"
          class="form-control"
          placeholder="Votre nom *"
          v-model="username"
          required
        />
      </div>
      <div class="form-group">
        <input
          name="password"
          type="password"
          class="form-control"
          placeholder="Votre mot de passe *"
          v-model="password"
          required
        />
      </div>
      <div class="form-group">
        <input
          name="password-confirm"
          type="password"
          class="form-control"
          placeholder="Confirmez votre mot de passe *"
          v-model="passwordConfirmation"
          required
        />
      </div>
      <div class="form-group">
        <input
          type="submit"
          class="btn btn-primary submit-btn btn-co"
          value="Créer un compte"
        />
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "SignUp",
  data: () => {
    return {
      email: '',
      username: '',
      password: '',
      passwordConfirmation: ''
    }
  },
  methods: {
    signUp () {
      if (this.password !== this.passwordConfirmation) {
        return this.$snotify.error('Passwords are not identical', 'Error !');
      }
      // call the api
      axios.post('/auth/signup/', {
        username: this.username,
        email: this.email,
        password: this.password
      }).then(response => {
        // set the user
        this.$store.commit('setUser', response.data.user);
        // redirect to the dashboard
        this.$router.push('/');
      }).catch(err => {
        this.$snotify.error(err.response.data.message, 'Error !');
      })
    }
  }
};
</script>

<style scoped>
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
</style>